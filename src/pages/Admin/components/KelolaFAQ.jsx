import React from 'react';
import { Button, Table, Modal, Space, Alert } from 'antd';
import { SweetAlert } from '../../../components/SweetAlert';
import TambahFaq from './modal/TambahFaq';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

export const data = [
	{
		key: '1',
		no: '1',
		pertanyaan: 'Sumbira',
		jawaban: 'Ini adalah makanan kucing',
	},
];

class KelolaFAQ extends React.Component {
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
				title: 'Pertanyaan',
				dataIndex: 'pertanyaan',
				key: 'pertanyaan',
				sorter: (a, b) => sorter(a.nama_produk, b.nama_produk),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Jawaban',
				dataIndex: 'jawaban',
				key: 'jawaban',
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
						Tambah FAQ
					</Button>
				</div>

				<h4 className='my-3'>Data FAQ</h4>
				<Table columns={columnsHabisPakai} dataSource={data} />

				{/* Modal Habis Pakai */}
				<Modal
					title='Tambah Produk'
					visible={isModalAddProduk}
					onOk={this.openNotification}
					onCancel={this.handleCancel}
				>
					<TambahFaq />
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
export default KelolaFAQ;
