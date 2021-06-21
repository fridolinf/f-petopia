import React from 'react';
import { Tabs, Table, Tag, Space, Input } from 'antd';

import {
	getOrderDoneList,
	deleteOrder,
} from '../../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import UIBlocker from 'react-ui-blocker';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';

export const sorter1 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

const { TabPane } = Tabs;

class TabPesananSelesai extends React.Component {
	state = { size: 'small' };

	delNotification = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'Data order akan dihapus!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.deleteOrder(id);
				swal('Data order berhasil dihapus', {
					icon: 'success',
				}).then(function () {
					if (true) {
						window.location.reload();
					}
				});
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	render() {
		const { size } = this.state;

		const columnPesananSelesai = [
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
				render: (text) => <Tag color='green'>{`SELESAI`}</Tag>,
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
			// {
			// 	title: 'Aksi',
			// 	dataIndex: 'aksi',
			// 	key: 'Aksi',
			// 	render: (text, record) => (
			// 		<Space size='small' direction='vertical'>
			// 			<button
			// 				className='btn btn-danger'
			// 				onClick={(e) => {
			// 					e.stopPropagation();
			// 					this.delNotification(record.id);
			// 				}}
			// 			>
			// 				Hapus
			// 			</button>
			// 		</Space>
			// 	),
			// },
		];

		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					message=''
					loading={this.state.loading}
				/>
				<h3>Data Pesanan Selesai</h3>
				<Table
					columns={columnPesananSelesai}
					loading={this.state.loading}
					dataSource={this.props.doneOrders}
					scroll={{ x: 1300 }}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { doneOrders, loading, error } = state.reducerAdmin;
	return { doneOrders, loading, error };
};
export default connect(mapStateToProps, {
	getOrderDoneList,
	deleteOrder,
})(TabPesananSelesai);
