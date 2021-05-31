import React from 'react';
import { Table, Modal, Space } from 'antd';
import {
	getDataUsers,
	getDataUsersSupplier,
	getDetailSupplier,
	delUser,
} from '../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import DetailSupplier from './modal/DetailSupplier';
import swal from 'sweetalert';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

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

	componentDidMount() {
		this.props.getDataUsers();
		this.props.getDataUsersSupplier();
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

	showDetailHabis = (id) => {
		this.setState({
			isModalDetailHabis: true,
		});
		this.props.getDetailSupplier(id);
	};

	delNotification = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'User akan dihapus!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.delUser(id);
				swal('User berhasil dihapus', {
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
			isModalEditHabis: false,
			isModalDetailHabis: false,
		});
	};

	render() {
		const { isModalEditHabis, isModalDetailHabis } = this.state;

		// Table Users
		const columnUsers = [
			{
				title: 'Nama',
				dataIndex: 'name',
				key: 'name',
				sorter: (a, b) => sorter(a.name, b.name),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: 'No Hp',
				dataIndex: 'phone',
				key: 'phone',
				sorter: (a, b) => sorter(a.phone, b.phone),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Alamat',
				dataIndex: 'address',
				key: 'address',
				sorter: (a, b) => sorter(a.address, b.address),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Tanggal_dibuat',
				dataIndex: 'dateCreated',
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
						<button className='btn btn-warning' onClick={this.showEditHabis}>
							Edit
						</button>
						<button
							className='btn btn-danger'
							onClick={(e) => {
								e.stopPropagation();
								this.delNotification(record.id);
							}}
						>
							Delete
						</button>
					</Space>
				),
			},
		];
		// Table Admin
		const columnAdmin = [
			{
				title: 'Nama',
				dataIndex: 'name',
				key: 'name',
				sorter: (a, b) => sorter(a.name, b.name),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: 'No Hp',
				dataIndex: 'phone',
				key: 'phone',
				sorter: (a, b) => sorter(a.phone, b.phone),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Alamat',
				dataIndex: 'address',
				key: 'address',
				sorter: (a, b) => sorter(a.address, b.address),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Tanggal_dibuat',
				dataIndex: 'dateCreated',
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
						<button className='btn btn-warning' onClick={this.showEditHabis}>
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
						<button className='btn btn-danger'>Delete</button>
					</Space>
				),
			},
		];

		return (
			<div>
				<h4 className='my-3'>Data User</h4>
				<Table columns={columnUsers} dataSource={this.props.users} />

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
				<h4 className='my-3'>Data Pemilik Toko</h4>
				<Table columns={columnAdmin} dataSource={this.props.usersSupplier} />

				{/* Modal Edit Habis  */}
				<Modal
					title='Edit Produk'
					visible={isModalEditHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>

				{/* Modal Detail Habis */}
				<Modal
					width='50%'
					title='Detail Supplier'
					visible={isModalDetailHabis}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<DetailSupplier data={this.props.supplierDetail} />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		users,
		usersSupplier,
		supplierDetail,
		loading,
		error,
	} = state.reducerAdmin;
	return { users, usersSupplier, supplierDetail, loading, error };
};
export default connect(mapStateToProps, {
	getDataUsers,
	getDataUsersSupplier,
	getDetailSupplier,
	delUser,
})(KelolaUser);
