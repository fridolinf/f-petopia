import React from 'react';
import { Table, Space } from 'antd';
import {
	accDataVerifikasi,
	getDataVerifikasi,
	tolakDataVerifikasi,
} from '../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

class VerifikasiSupplier extends React.Component {
	componentDidMount() {
		this.props.getDataVerifikasi();
	}

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
								this.props.accDataVerifikasi(record.id);
							}}
						>
							Terima
						</button>
						<button
							className='btn btn-danger'
							onClick={(e) => {
								e.stopPropagation();
								this.props.tolakDataVerifikasi(record.id);
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
				<h4 className='my-3'>Verifikasi Supplier</h4>
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
