import React from 'react';
import { Tabs, Table, Tag } from 'antd';

export const sorter1 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;
export const columnsHabisPakai = [
	{
		title: 'Id Pesanan',
		dataIndex: 'id_pesanan',
		key: 'Id Pesanan',
		sorter: (a, b) => sorter1(a.id_pesanan, b.id_pesanan),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Nama Produk',
		dataIndex: 'nama_produk',
		key: 'Nama Produk',
		sorter: (a, b) => sorter1(a.nama_produk, b.nama_produk),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Jumlah',
		dataIndex: 'jumlah',
		key: 'jumlah',
		sorter: (a, b) => sorter1(a.jumlah, b.jumlah),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (status) => (
			<>
				{status.map((tag) => {
					let color = tag.length > 7 ? 'yellow' : 'green';
					if (tag === 'Menunggu Konfirmasi') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Total Harga',
		dataIndex: 'total_harga',
		key: 'total_harga',
		sorter: (a, b) => sorter1(a.total_harga, b.total_harga),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Nama Toko',
		dataIndex: 'nama_toko',
		key: 'nama_toko',
	},
	{
		title: 'Alamat',
		dataIndex: 'alamat_pengguna',
		key: 'alamat_pengguna',
	},
	{
		title: 'No Hp',
		dataIndex: 'no_hp',
		key: 'no_hp',
	},
	{
		title: 'Nama Pemesan',
		dataIndex: 'nama_pemesan',
		key: 'nama_pemesan',
	},
	{
		title: 'Tanggal Order',
		dataIndex: 'tanggal_order',
		key: 'Tanggal Order',
		sorter: (a, b) => sorter1(a.tanggal_order, b.tanggal_order),
		sortDirections: ['descend', 'ascend'],
	},
];
export const data1 = [
	{
		key: '1',
		id_pesanan: 'INV - 001',
		nama_produk: 'whiskas',
		jumlah: '3',
		status: ['Dikirim'],
		total_harga: 'Rp.30.000',
		nama_toko: 'TokoKu',
		alamat_pengguna: 'Jl. JenderalS Rt03 Rw03 No05',
		no_hp: '082192391239',
		nama_pemesan: 'BudiAn',
		tanggal_order: '03/01/2021',
	},
];

export const sorter2 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;
export const columnsPetHotel = [
	{
		title: 'Id Pesanan',
		dataIndex: 'id_pesanan',
		key: 'Id Pesanan',
		sorter: (a, b) => sorter2(a.id_pesanan, b.id_pesanan),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Nama Produk',
		dataIndex: 'nama_produk',
		key: 'Nama Produk',
		sorter: (a, b) => sorter2(a.nama_produk, b.nama_produk),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Jumlah',
		dataIndex: 'jumlah',
		key: 'jumlah',
		sorter: (a, b) => sorter2(a.jumlah, b.jumlah),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (status) => (
			<>
				{status.map((tag) => {
					let color = tag.length > 7 ? 'yellow' : 'green';
					if (tag === 'Menunggu Konfirmasi') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Total Harga',
		dataIndex: 'total_harga',
		key: 'total_harga',
		sorter: (a, b) => sorter2(a.total_harga, b.total_harga),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Nama Toko',
		dataIndex: 'nama_toko',
		key: 'nama_toko',
	},
	{
		title: 'Alamat',
		dataIndex: 'alamat_pengguna',
		key: 'alamat_pengguna',
	},
	{
		title: 'No Hp',
		dataIndex: 'no_hp',
		key: 'no_hp',
	},
	{
		title: 'Nama Pemesan',
		dataIndex: 'nama_pemesan',
		key: 'nama_pemesan',
	},
	{
		title: 'Tanggal Order',
		dataIndex: 'tanggal_order',
		key: 'Tanggal Order',
		sorter: (a, b) => sorter2(a.tanggal_order, b.tanggal_order),
		sortDirections: ['descend', 'ascend'],
	},
];
export const data2 = [
	{
		key: '1',
		id_pesanan: 'INV - 001',
		nama_produk: 'whiskas',
		jumlah: '3',
		status: ['Dikirim'],
		total_harga: 'Rp.30.000',
		nama_toko: 'TokoKu',
		alamat_pengguna: 'Jl. JenderalS Rt03 Rw03 No05',
		no_hp: '082192391239',
		nama_pemesan: 'BudiAn',
		tanggal_order: '03/01/2021',
	},
];

export const sorter3 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;
export const columnsPetGrooming = [
	{
		title: 'Id Pesanan',
		dataIndex: 'id_pesanan',
		key: 'Id Pesanan',
		sorter: (a, b) => sorter3(a.id_pesanan, b.id_pesanan),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Nama Produk',
		dataIndex: 'nama_produk',
		key: 'Nama Produk',
		sorter: (a, b) => sorter3(a.nama_produk, b.nama_produk),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Jumlah',
		dataIndex: 'jumlah',
		key: 'jumlah',
		sorter: (a, b) => sorter3(a.jumlah, b.jumlah),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (status) => (
			<>
				{status.map((tag) => {
					let color = tag.length > 7 ? 'yellow' : 'green';
					if (tag === 'Menunggu Konfirmasi') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Total Harga',
		dataIndex: 'total_harga',
		key: 'total_harga',
		sorter: (a, b) => sorter3(a.total_harga, b.total_harga),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Nama Toko',
		dataIndex: 'nama_toko',
		key: 'nama_toko',
	},
	{
		title: 'Alamat',
		dataIndex: 'alamat_pengguna',
		key: 'alamat_pengguna',
	},
	{
		title: 'No Hp',
		dataIndex: 'no_hp',
		key: 'no_hp',
	},
	{
		title: 'Nama Pemesan',
		dataIndex: 'nama_pemesan',
		key: 'nama_pemesan',
	},
	{
		title: 'Tanggal Order',
		dataIndex: 'tanggal_order',
		key: 'Tanggal Order',
		sorter: (a, b) => sorter3(a.tanggal_order, b.tanggal_order),
		sortDirections: ['descend', 'ascend'],
	},
];
export const data3 = [
	{
		key: '1',
		id_pesanan: 'INV - 001',
		nama_produk: 'whiskas',
		jumlah: '3',
		status: ['Dikirim'],
		total_harga: 'Rp.30.000',
		nama_toko: 'TokoKu',
		alamat_pengguna: 'Jl. JenderalS Rt03 Rw03 No05',
		no_hp: '082192391239',
		nama_pemesan: 'BudiAn',
		tanggal_order: '03/01/2021',
	},
];

const { TabPane } = Tabs;

class TabPengiriman extends React.Component {
	state = { size: 'small' };

	render() {
		const { size } = this.state;
		return (
			<div>
				<Tabs centered defaultActiveKey='1' type='card' size={size}>
					<TabPane tab='Habis Pakai' key='1'>
						<h3>Data Pesanan Produk Habis Pakai</h3>
						<Table columns={columnsHabisPakai} dataSource={data1} />
					</TabPane>
					<TabPane tab='Pet Hotel' key='2'>
						<h3>Data Pesanan Produk Pet Hotel</h3>
						<Table columns={columnsPetHotel} dataSource={data2} />
					</TabPane>
					<TabPane tab='Pet Grooming' key='3'>
						<h3>Data Pesanan Produk Pet Grooming</h3>
						<Table columns={columnsPetGrooming} dataSource={data3} />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
export default TabPengiriman;
