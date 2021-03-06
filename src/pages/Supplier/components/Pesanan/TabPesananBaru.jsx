import React from 'react';
import { Tabs, Table, Tag, Space } from 'antd';
import {
	getOrderNewList,
	confirmOrder,
	getOrderSentList,
} from '../../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import UIBlocker from 'react-ui-blocker';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';

export const sorter1 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

const { TabPane } = Tabs;

class TabPesananBaru extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}
	state = { size: 'small' };

	confirmNotif = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'Pesanan akan dikirim!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.confirmOrder(id);
				swal('Pesanan berhasil dikirim', {
					icon: 'success',
				});
				window.location.href =
					process.env.PUBLIC_URL + '/supplier/kelolapesanan';
				this.props.getOrderNewList();
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	render() {
		const { size } = this.state;

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
						<button className='btn btn-info'>Detail</button>
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
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const { newOrders, loading, error } = state.reducerAdmin;
	const { user } = state.reducerSupplier;
	return { newOrders, user, loading, error };
};
export default connect(mapStateToProps, {
	getOrderNewList,
	confirmOrder,
	getOrderSentList,
})(TabPesananBaru);
