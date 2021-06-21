import React from 'react';
import { Button, Table, Modal, Space } from 'antd';
import TambahFaq from './modal/TambahFaq';
import {
	addFaq,
	getDataFaq,
	delFaq,
	getDetailFaq,
	updateFaq,
} from '../../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import UIBlocker from 'react-ui-blocker';
import DetailFaq from './modal/DetailFaq';
import FormEditFaq from './modal/FormEditFaq';
import moment from 'moment';
import 'moment/locale/id';
import { isLongText } from '../../../utils/utility';

const sorter = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

class KelolaFAQ extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			isModalAddFaq: false,
			isModalEditFaq: false,
			isModalDetailFaq: false,
		};
	}
	componentDidMount() {
		this.props.getDataFaq();
	}

	showModal1Faq = () => {
		this.setState({ isModalAddFaq: true });
	};

	showEditFaq = (id) => {
		this.setState({ isModalEditFaq: true, id: id });
		this.props.getDetailFaq(id);
	};

	showDetailFaq = (id) => {
		this.setState({
			isModalDetailFaq: true,
		});
		this.props.getDetailFaq(id);
	};

	// Tambah Data
	onSubmitHandler = (value) => {
		let data = {
			pertanyaan: value.pertanyaan,
			jawaban: value.jawaban,
		};
		this.setState({ isModalAddFaq: false });
		this.props.addFaq(data);
	};

	// Edit Data
	onSubmitHandlerEdit = (value) => {
		let data = {
			pertanyaan: value.pertanyaan,
			jawaban: value.jawaban,
		};
		this.setState({ isModalEditFaq: false });
		this.props.updateFaq(data, this.state.id);
	};

	handleCancelEdit = () => {
		this.setState({
			isModalEditFaq: false,
		});
	};

	delNotification = (id) => {
		swal({
			title: 'Apakah anda yakin?',
			text: 'FAQ akan dihapus!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.props.delFaq(id);
				swal('FAQ berhasil dihapus', {
					icon: 'success',
				});

				this.setState({ isModalAddFaq: false });
			} else {
				swal('baik terimakasih', {
					icon: 'success',
				});
			}
		});
	};

	handleOk = () => {
		this.setState({
			isModalEditFaq: false,
			isModalDetailFaq: false,
		});
	};

	handleCancel = () => {
		this.setState({
			isModalAddFaq: false,
			isModalEditFaq: false,
			isModalDetailFaq: false,
		});
		window.location.href = process.env.PUBLIC_URL + '/admin/kelolafaq';
	};

	render() {
		const { isModalAddFaq, isModalEditFaq, isModalDetailFaq } = this.state;

		const columnFaq = [
			{
				title: 'Pertanyaan',
				dataIndex: 'pertanyaan',
				key: 'pertanyaan',
				sorter: (a, b) => sorter(a.pertanyaan, b.pertanyaan),
				sortDirections: ['descend', 'ascend'],
			},
			{
				title: 'Jawaban',
				dataIndex: 'jawaban',
				render: (text) => (
					<div
						dangerouslySetInnerHTML={{ __html: isLongText(text, 100) }}
					></div>
				),
				key: 'jawaban',
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
								this.showEditFaq(record.id);
							}}
						>
							Edit
						</button>
						<button
							className='btn btn-info'
							onClick={(e) => {
								e.stopPropagation();
								this.showDetailFaq(record.id);
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
					<Button className=' btn-info' onClick={this.showModal1Faq}>
						Tambah FAQ
					</Button>
				</div>

				<h4 className='my-3'>Data FAQ</h4>
				<Table columns={columnFaq} dataSource={this.props.faqs} />

				{/* Modal Faq Pakai */}
				<Modal
					title='Tambah FAQ'
					visible={isModalAddFaq}
					footer={null}
					width={750}
					closable={false}
				>
					<TambahFaq
						onCancel={this.handleCancel}
						onConfirm={this.onSubmitHandler}
						loading={this.state.loading}
					/>
				</Modal>
				{/* Modal Detail Habis */}
				<Modal
					width='50%'
					title='Detail FAQ'
					visible={isModalDetailFaq}
					footer={
						<Button key='back' onClick={this.handleOk}>
							Tutup
						</Button>
					}
				>
					<DetailFaq data={this.props.faq} />
				</Modal>

				{/* Modal Edit Faq  */}
				<Modal
					title='Edit FAQ'
					visible={isModalEditFaq}
					footer={null}
					width={750}
					closable={false}
				>
					<FormEditFaq
						onCancel={this.handleCancelEdit}
						onConfirm={this.onSubmitHandlerEdit}
						loading={this.state.loading}
						data={this.props.faq}
					/>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const { faqs, faq, loading, error } = state.reducerAdmin;
	return { faqs, faq, loading, error };
};
export default connect(mapStateToProps, {
	getDataFaq,
	addFaq,
	delFaq,
	getDetailFaq,
	updateFaq,
})(KelolaFAQ);
