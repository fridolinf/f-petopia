import React from 'react';
import { Table, Tag, Space, Modal, Button } from 'antd';
import {
	getOrderNewList,
	confirmOrder,
	getOrderSentList,
	getDetailOrder,
} from '../../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import UIBlocker from 'react-ui-blocker';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';
import DetailOrder from '../../../Admin/components/modal/DetailOrder';
export const sorter1 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

class TabPesananBaru extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalDetailOrder: false,
			loading: false,
			id: '',
		};
	}
	state = { size: 'small' };

	showDetail = (id) => {
		this.setState({ isModalDetailOrder: true, id: id });
		this.props.getDetailOrder(id);
	};

	handleOk = () => {
		this.setState({
			isModalDetailOrder: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalDetailOrder: false,
		});
	};

	confirmNotif = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'Pesanan akan diterima!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.confirmOrder(id);
				swal('Pesanan berhasil diterima', {
					icon: 'success',
				});
				this.props.getOrderSentList();
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	render() {
		const { isModalDetailOrder } = this.state;

		const columnPesananBaru = [
			{
				title: 'Id Pesanan',
				dataIndex: 'id',
				key: 'id',
				sorter: (a, b) => sorter1(a.id, b.id),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				render: (text) => <Tag color='red'>{`Menunggu Konfirmasi`}</Tag>,
			},
			{
				title: 'Nama Produk',
				render: (record) => record.orderItems[0].product.name,
			},
			{
				title: 'Jumlah',
				render: (record) => record.orderItems[0].quantity,
				sorter: (a, b) => sorter1(a.quantity, b.quantity),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Total Harga',
				dataIndex: 'totalPrice',
				key: 'totalPrice',
				sorter: (a, b) => sorter1(a.totalPrice, b.totalPrice),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Nama Pemesan',
				dataIndex: ['user', 'name'],
			},
			{
				title: 'Alamat Pemesan',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: 'No Hp Pembeli',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: 'Tanggal Order',
				dataIndex: 'dateOrdered',
				key: 'dateOrdered',
				render: (text) => moment(text).format('LLLL'),
				sorter: (a, b) => sorter1(a.dateOrdered, b.dateOrdered),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Aksi',
				dataIndex: 'aksi',
				key: 'Aksi',
				render: (text, record) => (
					<Space size='small' direction='vertical'>
						<button
							className='btn btn-info'
							onClick={(e) => {
								e.stopPropagation();
								this.showDetail(record.id);
							}}
						>
							Detail
						</button>
						<button
							className='btn btn-primary'
							onClick={(e) => {
								e.stopPropagation();
								this.confirmNotif(record.id);
							}}
						>
							Konfirmasi
						</button>
					</Space>
				),
			},
		];

		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					message=''
					isVisible={this.props.loading}
				/>
				<h3>Data Pesanan Baru</h3>
				<Table
					columns={columnPesananBaru}
					loading={this.state.loading}
					dataSource={this.props.newOrders}
					scroll={{ x: 1300 }}
				/>
				{/* Modal Detail  */}
				<Modal
					width='50%'
					title='Detail Order'
					visible={isModalDetailOrder}
					footer={
						<Button key='back' onClick={this.handleCancel}>
							Tutup
						</Button>
					}
					closable={null}
				>
					<DetailOrder data={this.props.detailOrder} />
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const { newOrders, detailOrder, loading, error } = state.reducerAdmin;
	const { user } = state.reducerSupplier;
	return { newOrders, user, detailOrder, loading, error };
};
export default connect(mapStateToProps, {
	getOrderNewList,
	confirmOrder,
	getOrderSentList,
	getDetailOrder,
})(TabPesananBaru);
