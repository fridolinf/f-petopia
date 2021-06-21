import React from 'react';
import { Table, Space } from 'antd';
import {
	accDataVerifikasi,
	getDataVerifikasi,
	tolakDataVerifikasi,
} from '../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import swal from 'sweetalert';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

class VerifikasiSupplier extends React.Component {
	componentDidMount() {
		this.props.getDataVerifikasi();
	}

	terimaNotif = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'User akan menjadi pemilik toko!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.accDataVerifikasi(id);
				swal('data berhasil disimpan', {
					icon: 'success',
				});
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	tolakNotif = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'data market user akan dihapus!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.tolakDataVerifikasi(id);
				swal('user telah ditolak menjadi pemilik toko', {
					icon: 'success',
				});
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	render() {
		const columnDataVerifikasi = [
			{
				title: 'Id User',
				dataIndex: '_id',
				key: '_id',
				sorter: (a, b) => sorter(a.id_user, b.id_user),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Nama User',
				dataIndex: ['user', 'name'],
				key: ['user', 'name'],
			},
			{
				title: 'Nama Toko',
				dataIndex: 'marketName',
				key: 'marketName',
			},
			{
				title: 'Alamat Toko',
				dataIndex: ['user', 'address'],
				key: ['user', 'address'],
			},
			// {
			// 	title: 'Logo Toko',
			// 	dataIndex: 'logo_toko',
			// 	key: 'logo_toko',
			// 	render: (gambar) => <img width={50} src={gambar} alt={'gambar'}></img>,
			// },
			{
				title: 'Aksi',
				dataIndex: 'aksi',
				key: 'Aksi',
				render: (text, record) => (
					<Space size='small' direction='horizontal'>
						<button
							className='btn btn-primary'
							onClick={(e) => {
								e.stopPropagation();
								this.terimaNotif(record.id);
							}}
						>
							Terima
						</button>
						<button
							className='btn btn-danger'
							onClick={(e) => {
								e.stopPropagation();
								this.tolakNotif(record.id);
							}}
						>
							Tolak
						</button>
					</Space>
				),
			},
		];

		return (
			<div>
				<h4 className='my-3'>Data Pendaftaran Toko</h4>
				<Table
					columns={columnDataVerifikasi}
					dataSource={this.props.userVerifikasi}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { userVerifikasi, loading, error } = state.reducerAdmin;
	return { userVerifikasi, loading, error };
};
export default connect(mapStateToProps, {
	getDataVerifikasi,
	accDataVerifikasi,
	tolakDataVerifikasi,
})(VerifikasiSupplier);
