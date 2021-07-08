import React from 'react';
import { Tabs, Table, Tag, Space, Input } from 'antd';

import {
	getOrderSentList,
	sentOrder,
	getOrderDoneList,
} from '../../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import UIBlocker from 'react-ui-blocker';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';
import Text from 'antd/lib/typography/Text';

export const sorter1 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

const { TabPane } = Tabs;

class TabPesananDikirim extends React.Component {
	state = { size: 'small' };

	sentNotif = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'Pesanan akan dikirim!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.sentOrder(id);
				swal('Pesanan berhasil dikirim', {
					icon: 'success',
				});
				this.props.getOrderDoneList();
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	render() {
		const { size } = this.state;

		const columnPesananDikirim = [
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
				render: (text) => <Tag color='blue'>{`Diproses`}</Tag>,
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
				title: 'Tanggal Penjemputan',
				dataIndex: 'tanggalPenjemputan',
				key: 'tanggalPenjemputan',
				render: (text, record) =>
					record.tanggalPenjemputan ? (
						moment(text).format('LLLL')
					) : (
						<Text disabled>Kosong</Text>
					),
				sorter: (a, b) => sorter1(a.tanggalPenjemputan, b.tanggalPenjemputan),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Aksi',
				dataIndex: 'aksi',
				key: 'Aksi',
				render: (text, record) => (
					<Space size='small' direction='vertical'>
						{/* <button className='btn btn-info'>Detail</button> */}
						<button
							className='btn btn-primary'
							onClick={(e) => {
								e.stopPropagation();
								this.sentNotif(record.id);
							}}
						>
							Kirim
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
					loading={this.state.loading}
				/>
				<h3>Data Pesanan Dikirim</h3>
				<Table
					columns={columnPesananDikirim}
					loading={this.state.loading}
					dataSource={this.props.sentOrders}
					scroll={{ x: 1300 }}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { sentOrders, loading, error } = state.reducerAdmin;
	return { sentOrders, loading, error };
};
export default connect(mapStateToProps, {
	getOrderSentList,
	sentOrder,
	getOrderDoneList,
})(TabPesananDikirim);
