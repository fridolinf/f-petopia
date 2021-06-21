import React from 'react';
import { Button, Table, Modal, Space, Tag, message } from 'antd';
import UIBlocker from 'react-ui-blocker';
import FormTambahP from './components/FormTambahP';
import FormEdit from './components/FormEdit';
import FormDetail from './components/FormDetail';
import { connect } from 'react-redux';
import {
	getDetailProducts,
	delProducts,
	addProducts,
	updateProducts,
	getDataProducts,
} from '../../../../redux/supplier/action/actionSupplier';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';
import { isLongText } from '../../../../utils/utility';

export const sorter = (a, b) =>
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
		message.error('Hanya bisa upload file jpg/jpeg/png!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Gambar tidak bisa lebih dari 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

class TabPetHotel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalTambahPetHotel: false,
			isModalEditHotel: false,
			isModalDetailHotel: false,
			loading: false,
			imageUrl1: '',
			imageUrl2: '',
			imageUrl3: '',
			imageUrl4: '',
			dateCreated: '',
			id: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.product !== this.props.product) {
			this.setState({
				imageUrl1: nextProps.product.image1,
				imageUrl2: nextProps.product.image2,
				imageUrl3: nextProps.product.image3,
				imageUrl4: nextProps.product.image4,
				dateCreated: nextProps.product.dateCreated,
			});
		}
	}

	showModal1Hotel = () => {
		this.setState({ isModalTambahPetHotel: true });
	};

	showEditHotel = (id) => {
		this.setState({ isModalEditHotel: true, id: id });
		this.props.getDetailProducts(id);
	};

	showDetailHotel = (id) => {
		this.setState({
			isModalDetailHotel: true,
		});
		this.props.getDetailProducts(id);
	};

	// Delete Data
	deleteP = (id) => {
		this.props.delProducts(id);
	};

	// Tambah Data
	onSubmitHandler = (value) => {
		let data = {
			name: value.name,
			description: value.description,
			richDescription: value.richDescription,
			image1: this.state.imageUrl1,
			image2: this.state.imageUrl2,
			image3: this.state.imageUrl3,
			image4: this.state.imageUrl4,
			tipe: '608d5b246a3623372c02d48e',
			brand: value.brand,
			price: value.price,
			category: value.category,
			countInStock: value.countInStock,
		};
		this.setState({ isModalTambahPetHotel: false });
		this.props.addProducts(data);
	};

	// Edit Data
	onSubmitHandlerEdit = (value) => {
		let data = {
			name: value.name,
			description: value.description,
			richDescription: value.richDescription,
			image1: this.state.imageUrl1,
			image2: this.state.imageUrl2,
			image3: this.state.imageUrl3,
			image4: this.state.imageUrl4,
			tipe: '608d5b246a3623372c02d48e',
			brand: value.brand,
			price: value.price,
			category: value.category,
			countInStock: value.countInStock,
		};
		this.setState({ isModalEditHotel: false });
		this.props.updateProducts(data, this.state.id);
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
	// Handle image 2
	handleChangeImage2 = async (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			await getBase64(info.file.originFileObj, (imageUrl) => {
				this.setState({ loading: false, imageUrl2: imageUrl });
			});
		}
	};
	// Handle image 3
	handleChangeImage3 = async (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			await getBase64(info.file.originFileObj, (imageUrl) => {
				this.setState({ loading: false, imageUrl3: imageUrl });
			});
		}
	};
	// Handle image 4
	handleChangeImage4 = async (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			await getBase64(info.file.originFileObj, (imageUrl) => {
				this.setState({ loading: false, imageUrl4: imageUrl });
			});
		}
	};

	delNotification = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'Produk akan dihapus!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.delProducts(id);
				swal('data berhasil dihapus', {
					icon: 'success',
				});
				this.setState({ isModalTambahPetHotel: false });
				this.props.getDataProducts();
			} else {
				swal('baik terimakasih');
			}
		});
	};

	handleOk = () => {
		this.setState({
			isModalEditHotel: false,
			isModalDetailHotel: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalTambahPetHotel: false,
			isModalEditHotel: false,
			isModalDetailHotel: false,
		});
		window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	};
	handleCancelEdit = () => {
		this.setState({
			isModalEditHabis: false,
			imageUrl1: '',
			imageUrl2: '',
			imageUrl3: '',
			imageUrl4: '',
		});
	};

	render() {
		const {
			isModalTambahPetHotel,
			isModalEditHotel,
			isModalDetailHotel,
		} = this.state;

		// Table Pet Hotel
		const columnsPetHotel = [
			{
				title: 'Nama Produk',
				dataIndex: 'name',
				key: 'name',
				sorter: (a, b) => sorter(a.name, b.name),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Deskripsi',
				width: 200,
				dataIndex: 'description',
				render: (text) => isLongText(text, 100),
				key: 'description',
			},
			{
				title: 'Gambar',
				dataIndex: 'image1',
				key: 'image1',
				render: (image1) => <img width={50} src={image1} alt={'gambar'}></img>,
			},
			{
				title: 'Gambar Lanjut',
				dataIndex: 'image2',
				key: 'image2',
				render: (image2) => <img width={50} src={image2} alt={'gambars'}></img>,
			},
			{
				title: 'Merk',
				dataIndex: 'brand',
				key: 'brand',
				sorter: (a, b) => sorter(a.brand, b.brand),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Harga',
				dataIndex: 'price',
				key: 'price',
				sorter: (a, b) => sorter(a.price, b.price),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Kategori',
				render: (record) => record.category.name,
				sorter: (a, b) => a.category.name - b.category.name,
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Stok',
				dataIndex: 'countInStock',
				key: 'countInStock',
				sorter: (a, b) => sorter(a.countInStock, b.countInStock),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Rating',
				dataIndex: 'avgRating',
				key: 'avgRating',
				sorter: (a, b) => sorter(a.rating, b.rating),
			},
			{
				title: 'Status',
				dataIndex: 'countInStock',
				key: 'countInStock',

				render: (countInStock) => (
					<>
						{countInStock !== 0 ? (
							<Tag color={'green'}>Tersedia</Tag>
						) : (
							<Tag color={'volcano'}>Tidak Tersedia</Tag>
						)}
					</>
				),
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
					<Space size='small' direction='vertical'>
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
								this.showEditHotel(record.id);
							}}
						>
							Edit
						</button>
						<button
							className='btn btn-info'
							onClick={(e) => {
								e.stopPropagation();
								this.showDetailHotel(record.id);
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
					<Button className=' btn-info' onClick={this.showModal1Hotel}>
						Tambah Produk
					</Button>
				</div>

				<h4 className='my-3'>Data Produk Pet Hotel</h4>
				<Table
					columns={columnsPetHotel}
					scroll={{ x: 1300 }}
					dataSource={this.props.data}
				/>

				{/* Modal Pet Hotel */}
				<Modal
					title='Tambah Produk'
					visible={isModalTambahPetHotel}
					footer={null}
					width={750}
					closable={false}
				>
					<FormTambahP
						onCancel={this.handleCancel}
						onConfirm={this.onSubmitHandler}
						loading={this.state.loading}
						imageUrl1={this.state.imageUrl1}
						imageUrl2={this.state.imageUrl2}
						imageUrl3={this.state.imageUrl3}
						imageUrl4={this.state.imageUrl4}
						beforeUpload={beforeUpload}
						handleChange1={this.handleChangeImage1}
						handleChange2={this.handleChangeImage2}
						handleChange3={this.handleChangeImage3}
						handleChange4={this.handleChangeImage4}
					/>
				</Modal>

				{/* Modal Edit Hotel  */}
				<Modal
					title='Edit Produk'
					visible={isModalEditHotel}
					footer={null}
					width={750}
					closable={false}
				>
					<FormEdit
						onCancel={this.handleCancelEdit}
						onConfirm={this.onSubmitHandlerEdit}
						loading={this.state.loading}
						imageUrl1={this.state.imageUrl1}
						imageUrl2={this.state.imageUrl2}
						imageUrl3={this.state.imageUrl3}
						imageUrl4={this.state.imageUrl4}
						dateCreated={this.state.dateCreated}
						beforeUpload={beforeUpload}
						handleChange1={this.handleChangeImage1}
						handleChange2={this.handleChangeImage2}
						handleChange3={this.handleChangeImage3}
						handleChange4={this.handleChangeImage4}
						data={this.props.product}
					/>
				</Modal>

				{/* Modal Detail Produk */}
				<Modal
					width='50%'
					title='Detail Produk'
					visible={isModalDetailHotel}
					footer={
						<Button key='back' onClick={this.handleCancel}>
							Tutup
						</Button>
					}
					closable={null}
				>
					<FormDetail data={this.props.product} />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { products, product, loading, error } = state.reducerSupplier;
	return { products, product, loading, error };
};
export default connect(mapStateToProps, {
	getDetailProducts,
	delProducts,
	addProducts,
	updateProducts,
	getDataProducts,
})(TabPetHotel);
