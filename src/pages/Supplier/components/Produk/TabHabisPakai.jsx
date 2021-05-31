import React from 'react';
import { Button, Table, Modal, Space, Tag, message } from 'antd';
import FormTambahP from './components/FormTambahP';
import FormEdit from './components/FormEdit';
import FormDetail from './components/FormDetail';
import { connect } from 'react-redux';
import {
	delProducts,
	getDetailProducts,
	addProducts,
	updateProducts,
} from '../../../../redux/supplier/action/actionSupplier';
import UIBlocker from 'react-ui-blocker';
import swal from 'sweetalert';

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

class TabHabisPakai extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalAddProduk: false,
			isModalEditHabis: false,
			isModalDetailHabis: false,
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

	showModal1Habis = () => {
		this.setState({ isModalAddProduk: true });
	};

	showEditHabis = (id) => {
		this.setState({ isModalEditHabis: true, id: id });
		this.props.getDetailProducts(id);
	};

	showDetailHabis = (id) => {
		this.setState({
			isModalDetailHabis: true,
		});
		this.props.getDetailProducts(id);
	};

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
			tipe: '608d5adf6a3623372c02d48d',
			brand: value.brand,
			price: value.price,
			category: value.category,
			countInStock: value.countInStock,
		};
		this.setState({ isModalAddProduk: false });
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
			tipe: '608d5adf6a3623372c02d48d',
			brand: value.brand,
			price: value.price,
			category: value.category,
			countInStock: value.countInStock,
		};
		this.setState({ isModalEditHabis: false });
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

				this.setState({ isModalAddProduk: false });
			} else {
				swal('baik terimakasih');
			}
		});
	};

	handleOk = () => {
		this.setState({
			isModalEditHabis: false,
			isModalDetailHabis: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalAddProduk: false,
			isModalDetailHabis: false,
		});
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
			isModalAddProduk,
			isModalEditHabis,
			isModalDetailHabis,
		} = this.state;

		// Table Habis Pakai
		const columnsHabisPakai = [
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
				key: 'description',
			},
			{
				title: 'Gambar',
				dataIndex: 'image1',
				key: 'image1',
				render: (image1) => <img width={50} src={image1} alt={'gambar'}></img>,
			},
			{
				title: 'Gambar',
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
				dataIndex: 'rating',
				key: 'rating',
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
				dataIndex: 's',
				key: 'dateCreated',
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
								this.showEditHabis(record.id);
							}}
						>
							Edit
						</button>
						<button
							className='btn btn-info'
							onClick={(e) => {
								e.stopPropagation();
								this.showDetailHabis(record.id);
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
					<Button className=' btn-info' onClick={this.showModal1Habis}>
						Tambah Produk
					</Button>
				</div>

				<h4 className='my-3'>Data Produk Habis Pakai</h4>
				<Table columns={columnsHabisPakai} dataSource={this.props.data} />

				{/* Modal Tambah Product Habis Pakai */}
				<Modal
					title='Tambah Produk'
					visible={isModalAddProduk}
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
				{/* Modal Edit Habis  */}
				<Modal
					title='Edit Produk'
					visible={isModalEditHabis}
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

				{/* Modal Detail Habis */}
				<Modal
					width='50%'
					title='Detail Produk'
					visible={isModalDetailHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
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
})(TabHabisPakai);
