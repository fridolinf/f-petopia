import React from 'react';
import { Button, Table, Modal, Space, Tag, Alert } from 'antd';
import { SweetAlert } from '../../../components/SweetAlert';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

export const data = [
	{
		key: '1',
		id_user: 'Sumbira',
		status: ['pending'],
		nama_user: 'Ini adalah makanan kucing',
		nama_toko: 'Whiskas',
		alamat_toko: 'Whiskas',
		logo_toko:
			'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/10/20/075af1ad-f3de-4bda-8563-cdc2bbae0550.jpg.webp?ect=4g ',
	},
];

class VerifikasiSupplier extends React.Component {
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
				title: 'Id User',
				dataIndex: 'id_user',
				key: 'id_user',
				sorter: (a, b) => sorter(a.id_user, b.id_user),
				sortDirections: ['descend', 'ascend'],
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
				title: 'Nama User',
				dataIndex: 'nama_user',
				key: 'nama_user',
			},
			{
				title: 'Nama Toko',
				dataIndex: 'nama_toko',
				key: 'nama_toko',
			},
			{
				title: 'Alamat Toko',
				dataIndex: 'alamat_toko',
				key: 'alamat_toko',
			},
			{
				title: 'Logo Toko',
				dataIndex: 'logo_toko',
				key: 'logo_toko',
				render: (gambar) => <img width={50} src={gambar} alt={'gambar'}></img>,
			},
			{
				title: 'Aksi',
				dataIndex: 'aksi',
				key: 'Aksi',
				render: () => (
					<Space size='small' direction='horizontal'>
						<button className='btn btn-primary'>Terima</button>
						<button className='btn btn-danger'>Tolak</button>
					</Space>
				),
			},
		];

		return (
			<div>
				<h4 className='my-3'>Verifikasi Supplier</h4>
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

export default VerifikasiSupplier;
