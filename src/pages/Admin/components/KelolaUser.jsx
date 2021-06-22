import React from 'react';
import { Table, Modal, Space, Button } from 'antd';
import {
	getDataUsers,
	getDataUsersSupplier,
	getDetailSupplier,
	delUser,
} from '../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import DetailSupplier from './modal/DetailSupplier';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

class KelolaUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalAddUser: false,
			isModalKategoriUser: false,
			isModalEditUser: false,
			isModalDetailUser: false,
		};
	}

	componentDidMount() {
		this.props.getDataUsers();
		this.props.getDataUsersSupplier();
	}

	showModal1User = () => {
		this.setState({ isModalAddUser: true });
	};

	showModal2User = () => {
		this.setState({ isModalKategoriUser: true });
	};

	showEditUser = () => {
		this.setState({ isModalEditUser: true });
	};

	showDetailUser = (id) => {
		this.setState({
			isModalDetailUser: true,
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

				this.setState({ isModalAddUser: false });
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	handleOk = () => {
		this.setState({
			isModalEditUser: false,
			isModalDetailUser: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalEditUser: false,
			isModalDetailUser: false,
		});
	};

	render() {
		const { isModalEditUser, isModalDetailUser } = this.state;

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
				render: (text) => moment(text).format('LLLL'),
				sorter: (a, b) => sorter(a.dateCreated, b.dateCreated),
				sortDirections: ['descend', 'ascend'],
			},
			// {
			// 	title: 'Aksi',
			// 	dataIndex: 'aksi',
			// 	key: 'Aksi',
			// 	render: (text, record) => (
			// 		<Space size='small' direction='vertical'>
			// 			<button
			// 				className='btn btn-danger'
			// 				onClick={(e) => {
			// 					e.stopPropagation();
			// 					this.delNotification(record.id);
			// 				}}
			// 			>
			// 				Delete
			// 			</button>
			// 		</Space>
			// 	),
			// },
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
							className='btn btn-info'
							onClick={(e) => {
								e.stopPropagation();
								this.showDetailUser(record.id);
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
				<h4 className='my-3'>Data Pembeli</h4>
				<Table columns={columnUsers} dataSource={this.props.users} />

				{/* Modal Edit User  */}
				<Modal
					title='Edit User'
					visible={isModalEditUser}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>

				{/* Modal Detail User */}
				<Modal
					title='Detail User'
					visible={isModalDetailUser}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>

				{/*  */}
				<h4 className='my-3'>Data Pemilik Toko</h4>
				<Table columns={columnAdmin} dataSource={this.props.usersSupplier} />

				{/* Modal Edit User  */}
				<Modal
					title='Edit User'
					visible={isModalEditUser}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				></Modal>

				{/* Modal Detail User */}
				<Modal
					width='50%'
					title='Detail Supplier'
					visible={isModalDetailUser}
					footer={
						<Button key='back' onClick={this.handleCancel}>
							Tutup
						</Button>
					}
					closable={null}
				>
					<DetailSupplier data={this.props.supplierDetail} />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {users, usersSupplier, supplierDetail, loading,  error } = state.reducerAdmin;
	return { users, usersSupplier, supplierDetail, loading, error };
};
export default connect(mapStateToProps, {
	getDataUsers,
	getDataUsersSupplier,
	getDetailSupplier,
	delUser,
})(KelolaUser);
