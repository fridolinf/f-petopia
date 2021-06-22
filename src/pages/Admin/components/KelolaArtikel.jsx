import React from 'react';
import { Button, Table, Modal, Space, message } from 'antd';
import {
	addArtikel,
	delArtikel,
	getDataArtikel,
	getDetailArtikel,
	updateArtikel,
} from '../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import UIBlocker from 'react-ui-blocker';
import TambahArtikel from './modal/FormTambahArtikel';
import FormEditArtikel from './modal/FormEditArtikel';
import FormDetailArtikel from './modal/FormDetailArtikel';
import moment from 'moment';
import 'moment/locale/id';
import { isLongText } from '../../../utils/utility';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
	return false;
};

const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

class KelolaArtikel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalAddArtikel: false,
			isModalEditArtikel: false,
			isModalDetailArtikel: false,
			loading: false,
			imageUrl1: '',
			dateCreated: '',
			id: '',
		};
	}

	componentDidMount() {
		this.props.getDataArtikel();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.artikel !== this.props.artikel) {
			this.setState({
				imageUrl1: nextProps.artikel.image1,
				dateCreated: nextProps.artikel.dateCreated,
			});
		}
	}

	showModal1Artikel = () => {
		this.setState({ isModalAddArtikel: true });
	};

	showEditArtikel = (id) => {
		this.setState({ isModalEditArtikel: true, id: id });
		this.props.getDetailArtikel(id);
	};

	showDetailArtikel = (id) => {
		this.setState({ isModalDetailArtikel: true, id: id });
		this.props.getDetailArtikel(id);
	};

	// Tambah Data
	onSubmitHandler = (value) => {
		let data = {
			title: value.title,
			description: value.description,
			isi: value.isi,
			image1: this.state.imageUrl1,
		};
		this.setState({ isModalAddArtikel: false });
		this.props.addArtikel(data);
	};

	// Edit Data
	onSubmitHandlerEdit = (value) => {
		let data = {
			title: value.title,
			description: value.description,
			isi: value.isi,
			image1: this.state.imageUrl1,
		};
		this.setState({ isModalEditArtikel: false });
		this.props.updateArtikel(data, this.state.id);
	};

	// Handle image 1
	handleChangeImage1 = async (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			await getBase64(info.file.originFileObj, (imageUrl) => {
				this.setState({ loading: false, imageUrl1: imageUrl });
			});
		}
	};

	delNotification = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'Artikel akan dihapus!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.delArtikel(id);
				swal('Artikel berhasil dihapus', {
					icon: 'success',
				});

				this.setState({ isModalAddArtikel: false });
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	handleOk = () => {
		this.setState({
			isModalEditArtikel: false,
			isModalDetailArtikel: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalAddArtikel: false,
			isModalEditArtikel: false,
			isModalDetailArtikel: false,
		});
		window.location.href = process.env.PUBLIC_URL + '/admin/kelolaartikel';
	};

	handleCancelEdit = () => {
		this.setState({
			isModalEditArtikel: false,
			imageUrl1: '',
		});
	};

	render() {
		const {
			isModalAddArtikel,
			isModalEditArtikel,
			isModalDetailArtikel,
		} = this.state;

		// Table Artikel
		const columnsArtikel = [
			{
				title: 'Judul',
				dataIndex: 'title',
				key: 'title',
				sorter: (a, b) => sorter(a.title, b.title),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Deskripsi',
				dataIndex: 'description',
				render: (text) => isLongText(text, 100),
				key: 'description',
			},
			{
				title: 'Isi',
				dataIndex: 'isi',
				render: (text) => isLongText(text, 250),
				key: 'isi',
				elipsis: true,
			},
			{
				title: 'Gambar',
				dataIndex: 'image1',
				key: 'image1',
				render: (image1) => <img width={50} src={image1} alt={'gambar'}></img>,
			},
			{
				title: 'Tanggal_dibuat',
				dataIndex: 'dateCreated',
				key: 'dateCreated',
				render: (text) => moment(text).format('LLLL'),
				sorter: (a, b) => sorter(a.dateCreated, b.dateCreated),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Aksi',
				dataIndex: 'aksi',
				key: 'Aksi',
				render: (text, record) => (
					<Space size='small' direction='horizontal'>
						<button
							className='btn btn-danger'
							onClick={(e) => {
								e.stopPropagation();
								this.delNotification(record.id);
							}}
						>
							Delete
						</button>
						<button
							className='btn btn-warning'
							onClick={(e) => {
								e.stopPropagation();
								this.showEditArtikel(record.id);
							}}
						>
							Edit
						</button>
						<button
							className='btn btn-info'
							onClick={(e) => {
								e.stopPropagation();
								this.showDetailArtikel(record.id);
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
				<div style={{ marginRight: '10rem' }} className='mb-3'>
					<Button className=' btn-info' onClick={this.showModal1Artikel}>
						Tambah Artikel
					</Button>
				</div>

				<h4 className='my-3'>Data Artikel</h4>
				<Table columns={columnsArtikel} dataSource={this.props.artikels} />

				{/* Modal Detail Artikel */}
				<Modal
					width='50%'
					title='Detail Artikel'
					visible={isModalDetailArtikel}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<FormDetailArtikel data={this.props.artikel} />
				</Modal>

				{/* Modal Artikel */}
				<Modal
					title='Tambah Artikel'
					visible={isModalAddArtikel}
					footer={null}
					width={750}
					closable={false}
				>
					<TambahArtikel
						onCancel={this.handleCancel}
						onConfirm={this.onSubmitHandler}
						loading={this.state.loading}
						imageUrl1={this.state.imageUrl1}
						beforeUpload={beforeUpload}
						handleChange1={this.handleChangeImage1}
					/>
				</Modal>

				{/* Modal Edit Artikel  */}
				<Modal
					title='Edit Artikel'
					visible={isModalEditArtikel}
					footer={null}
					width={750}
					closable={false}
				>
					<FormEditArtikel
						onCancel={this.handleCancelEdit}
						onConfirm={this.onSubmitHandlerEdit}
						loading={this.state.loading}
						imageUrl1={this.state.imageUrl1}
						dateCreated={this.state.dateCreated}
						beforeUpload={beforeUpload}
						handleChange1={this.handleChangeImage1}
						data={this.props.artikel}
					/>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const { artikels, artikel, loading, error } = state.reducerAdmin;
	return { artikels, artikel, loading, error };
};
export default connect(mapStateToProps, {
	addArtikel,
	delArtikel,
	getDataArtikel,
	getDetailArtikel,
	updateArtikel,
})(KelolaArtikel);
