import React from 'react';
import { Button, Table, Modal, Space, Tag, Alert } from 'antd';
import { SweetAlert } from '../../../components/SweetAlert';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

export const data = [
	{
		key: '1',
		nama_produk: 'Sumbira',
		deskripsi: 'Ini adalah makanan kucing',
		gambar:
			'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/10/20/075af1ad-f3de-4bda-8563-cdc2bbae0550.jpg.webp?ect=4g ',
		gambars:
			'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/10/20/075af1ad-f3de-4bda-8563-cdc2bbae0550.jpg.webp?ect=4g',
		merk: 'Whiskas',
		harga: 'Rp.100.000',
		kategori: 'Makanan Kucing',
		stok: '30',
		rating: '4.5',
		status: ['tersedia'],
		tanggal_dibuat: '07/11/2021',
	},
];

class KelolaUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalAddProduk: false,
			isModalKategoriProduk: false,
			isModalEditHabis: false,
			isModalDetailHabis: false,
		};
	}

	showModal1Habis = () => {
		this.setState({ isModalAddProduk: true });
	};

	showModal2Habis = () => {
		this.setState({ isModalKategoriProduk: true });
	};

	showEditHabis = () => {
		this.setState({ isModalEditHabis: true });
	};

	showDetailHabis = () => {
		this.setState({ isModalDetailHabis: true });
	};

	alertTambah = () => {
		return (
			<Alert
				message='Info Text'
				description='Info Description Info Description Info Description Info Description'
				type='info'
				action={
					<Space direction='vertical'>
						<Button size='small' type='primary'>
							Accept
						</Button>
						<Button size='small' danger type='ghost'>
							Decline
						</Button>
					</Space>
				}
				closable
			/>
		);
	};

	openNotification = () => {
		SweetAlert(
			'apakah anda yakin ?',
			'Item ini akan di post',
			true,
			true,
			true,
			'Item telah di Post',
			'Baik, terimakasih'
		);
	};

	handleOk = () => {
		this.setState({
			isModalEditHabis: false,
			isModalDetailHabis: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalEditHabis: false,
			isModalDetailHabis: false,
		});
	};

	render() {
		const { isModalEditHabis, isModalDetailHabis } = this.state;

		// Table Habis Pakai
		const columnsHabisPakai = [
			{
				title: 'Nama Produk',
				dataIndex: 'nama_produk',
				key: 'Nama Produk',
				sorter: (a, b) => sorter(a.nama_produk, b.nama_produk),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Deskripsi',
				dataIndex: 'deskripsi',
				key: 'deskripsi',
			},
			{
				title: 'Gambar',
				dataIndex: 'gambar',
				key: 'gambar',
				render: (gambar) => <img width={50} src={gambar} alt={'gambar'}></img>,
			},
			{
				title: 'Gambars',
				dataIndex: 'gambars',
				key: 'gambars',
				render: (gambars) => (
					<img width={50} src={gambars} alt={'gambars'}></img>
				),
			},
			{
				title: 'Merk',
				dataIndex: 'merk',
				key: 'merk',
				sorter: (a, b) => sorter(a.merk, b.merk),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Harga',
				dataIndex: 'harga',
				key: 'Harga',
				sorter: (a, b) => sorter(a.harga, b.harga),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Kategori',
				dataIndex: 'kategori',
				key: 'kategori',
				sorter: (a, b) => sorter(a.kategori, b.kategori),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Stok',
				dataIndex: 'stok',
				key: 'Stok',
				sorter: (a, b) => sorter(a.stok, b.stok),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Rating',
				dataIndex: 'rating',
				key: 'rating',
				sorter: (a, b) => sorter(a.rating, b.rating),
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				render: (status_pengiriman) => (
					<>
						{status_pengiriman.map((tag) => {
							let color = tag.length === 8 ? 'green' : 'volcano';
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
				title: 'Tanggal_dibuat',
				dataIndex: 'tanggal_dibuat',
				key: 'tanggal_dibuat',
				sorter: (a, b) => sorter(a.tanggal_dibuat, b.tanggal_dibuat),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Aksi',
				dataIndex: 'aksi',
				key: 'Aksi',
				render: () => (
					<Space size='small' direction='vertical'>
						<button className='btn btn-danger'>Delete</button>
						<button className='btn btn-warning' onClick={this.showEditHabis}>
							Edit
						</button>
						<button className='btn btn-info' onClick={this.showDetailHabis}>
							Detail
						</button>
					</Space>
				),
			},
		];

		return (
			<div>
				<h4 className='my-3'>Data User</h4>
				<Table columns={columnsHabisPakai} dataSource={data} />

				{/* Modal Edit Habis  */}
				<Modal
					title='Edit Produk'
					visible={isModalEditHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>

				{/* Modal Detail Habis */}
				<Modal
					title='Detail Produk'
					visible={isModalDetailHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>

				{/*  */}
				<h4 className='my-3'>Data Supplier</h4>
				<Table columns={columnsHabisPakai} dataSource={data} />

				{/* Modal Edit Habis  */}
				<Modal
					title='Edit Produk'
					visible={isModalEditHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>

				{/* Modal Detail Habis */}
				<Modal
					title='Detail Produk'
					visible={isModalDetailHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>
			</div>
		);
	}
}

export default KelolaUser;
