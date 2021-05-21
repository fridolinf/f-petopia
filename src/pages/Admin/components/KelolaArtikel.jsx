import React from 'react';
import { Button, Table, Modal, Space, Alert } from 'antd';
import { SweetAlert } from '../../../components/SweetAlert';
import TambahArtikel from './modal/TambahArtikel';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

export const data = [
	{
		key: '1',
		no: '1',
		judul: 'Sumbira',
		isi: 'Ini adalah makanan kucing',
		gambar:
			'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/10/20/075af1ad-f3de-4bda-8563-cdc2bbae0550.jpg.webp?ect=4g ',
		tanggal_dibuat: '07/11/2021',
	},
];

class KelolaArtikel extends React.Component {
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
			isModalAddProduk: false,
			isModalKategoriProduk: false,
			isModalEditHabis: false,
			isModalDetailHabis: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalAddProduk: false,
			isModalKategoriProduk: false,
			isModalEditHabis: false,
			isModalDetailHabis: false,
		});
	};

	render() {
		const { isModalAddProduk, isModalEditHabis } = this.state;

		// Table Habis Pakai
		const columnsHabisPakai = [
			{
				title: 'No',
				dataIndex: 'no',
				key: 'no',
				sorter: (a, b) => sorter(a.no, b.no),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Judul',
				dataIndex: 'judul',
				key: 'judul',
				sorter: (a, b) => sorter(a.nama_produk, b.nama_produk),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Isi',
				dataIndex: 'isi',
				key: 'isi',
			},
			{
				title: 'Gambar',
				dataIndex: 'gambar',
				key: 'gambar',
				render: (gambar) => <img width={50} src={gambar} alt={'gambar'}></img>,
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
					<Space size='small' direction='horizontal'>
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
				<div style={{ marginRight: '10rem' }} className='mb-3'>
					<Button className=' btn-info' onClick={this.showModal1Habis}>
						Tambah Artikel
					</Button>
				</div>

				<h4 className='my-3'>Data Artikel</h4>
				<Table columns={columnsHabisPakai} dataSource={data} />

				{/* Modal Habis Pakai */}
				<Modal
					title='Tambah Produk'
					visible={isModalAddProduk}
					onOk={this.openNotification}
					onCancel={this.handleCancel}
				>
					<TambahArtikel />
				</Modal>

				{/* Modal Edit Habis  */}
				<Modal
					title='Edit Produk'
					visible={isModalEditHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>
			</div>
		);
	}
}
export default KelolaArtikel;
