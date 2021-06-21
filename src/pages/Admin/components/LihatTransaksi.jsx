import React, { Component } from 'react';
import {
	getDetailOrder,
	getAllTransactions,
} from '../../../redux/admin/action/actionAdmin';
import { Space, Tag, Row, Table, Button, Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/id';
import UIBlocker from 'react-ui-blocker';
import { connect } from 'react-redux';
import DetailOrder from './modal/DetailOrder';

export const sorter1 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

class LihatTransaksi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalDetailOrder: false,
			loading: false,
			id: '',
		};
	}
	componentDidMount() {
		this.props.getAllTransactions();
	}

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

	render() {
		const { allTransactions } = this.props;
		const { isModalDetailOrder } = this.state;
		const tableAllOrder = [
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
				render: (status) => (
					<>
						{status <= 1 ? (
							<Tag color={'green'}>Pesanan Selesai</Tag>
						) : status > 2 ? (
							<Tag color={'red'}>Pesanan Baru</Tag>
						) : (
							<Tag color={'blue'}>Sedang Diproses</Tag>
						)}
					</>
				),
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
				title: 'Nama Market',
				render: (record) => record.orderItems[0].product.market.marketName,
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
					</Space>
				),
			},
		];
		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					isVisible={this.props.loading}
					message=''
				/>
				<h4>Data Transaksi</h4>
				<Row className='d-flex justify-content-center mt-3'>
					<Table
						columns={tableAllOrder}
						loading={this.state.loading}
						dataSource={allTransactions}
						scroll={{ x: 1300 }}
					/>
				</Row>

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
	const { detailOrder, allTransactions, loading, error } = state.reducerAdmin;
	return { allTransactions, detailOrder, loading, error };
};
export default connect(mapStateToProps, {
	getAllTransactions,
	getDetailOrder,
})(LihatTransaksi);
