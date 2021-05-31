import React, { useEffect } from 'react';
import {
	Form,
	Input,
	Button,
	InputNumber,
	Upload,
	Select,
	Row,
	Col,
	List,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { getDataCategories } from '../../../../../redux/supplier/action/actionSupplier';

const FormTambahP = (props) => {
	const selector = useSelector((state) => state.reducerSupplier);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDataCategories());
	}, [null]);

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const formItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};

	let onConfirm = props.onConfirm;

	let onCancel = props.onCancel;

	const uploadButton = (
		<div>
			{props.loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<>
			<Form
				name='validate_other'
				{...formItemLayout}
				onFinish={onConfirm}
				autoComplete='off'
			>
				<List
					header={
						<div>
							Nama<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item
						className='mt-1 justify-content-center'
						name='name'
						rules={[
							{
								required: true,
								message: 'Nama harus diisi!',
							},
							{
								min: 7,
								message: 'Nama Produk harus lebih dari 7 huruf',
							},
						]}
						a
					>
						<Input />
					</Form.Item>
				</List>

				<List
					header={
						<div>
							Deskripsi<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item
						name='description'
						className='mt-1 justify-content-center'
						rules={[
							{
								required: true,
								message: 'Deskripsi harus diisi!',
							},
							{
								min: 20,
								message: 'Nama Produk harus lebih dari 20 huruf',
							},
							{
								max: 100,
								message: 'Deskripsi produk tidak bisa lebih dari 100 huruf',
							},
						]}
						a
					>
						<TextArea showCount maxLength={100} size='large' />
					</Form.Item>
				</List>

				<List
					header={<div>Deskripsi Penuh</div>}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item
						name='richDescription'
						className='mt-1 justify-content-center'
					>
						<TextArea size='large' />
					</Form.Item>
				</List>

				<List
					header={
						<div>
							Upload Gambar<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
				>
					<Row gutter={24} justify='center' className='mt-4'>
						<Col className='gutter-row '>
							<Form.Item
								name='image1'
								rules={[
									{
										required: true,
										message: 'Logo harus harus diisi!',
									},
								]}
								a
							>
								<Upload
									listType='picture-card'
									className='avatar-uploader'
									showUploadList={false}
									beforeUpload={props.beforeUpload}
									onChange={props.handleChange1}
									customRequest={dummyRequest}
								>
									{props.imageUrl1 ? (
										<img
											src={props.imageUrl1}
											alt='avatar'
											style={{ maxWidth: '100%', maxHeight: '100%' }}
										/>
									) : (
										uploadButton
									)}
								</Upload>
							</Form.Item>
						</Col>
						<Col className='gutter-row '>
							<Form.Item name='image2'>
								<Upload
									listType='picture-card'
									className='avatar-uploader'
									showUploadList={false}
									beforeUpload={props.beforeUpload}
									onChange={props.handleChange2}
									customRequest={dummyRequest}
								>
									{props.imageUrl2 ? (
										<img
											src={props.imageUrl2}
											alt='avatar'
											style={{ maxWidth: '100%', maxHeight: '100%' }}
										/>
									) : (
										uploadButton
									)}
								</Upload>
							</Form.Item>
						</Col>
						<Col className='gutter-row mt-4'>
							<Form.Item name='image3'>
								<Upload
									listType='picture-card'
									className='avatar-uploader'
									showUploadList={false}
									beforeUpload={props.beforeUpload}
									onChange={props.handleChange3}
									customRequest={dummyRequest}
								>
									{props.imageUrl3 ? (
										<img
											src={props.imageUrl3}
											alt='avatar'
											style={{ maxWidth: '100%', maxHeight: '100%' }}
										/>
									) : (
										uploadButton
									)}
								</Upload>
							</Form.Item>
						</Col>
						<Col className='gutter-row mt-4'>
							<Form.Item name='image4'>
								<Upload
									listType='picture-card'
									className='avatar-uploader'
									showUploadList={false}
									beforeUpload={props.beforeUpload}
									onChange={props.handleChange4}
									customRequest={dummyRequest}
								>
									{props.imageUrl4 ? (
										<img
											src={props.imageUrl4}
											alt='avatar'
											style={{ maxWidth: '100%', maxHeight: '100%' }}
										/>
									) : (
										uploadButton
									)}
								</Upload>
							</Form.Item>
						</Col>
					</Row>
				</List>

				<List
					header={
						<div>
							Merk<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mt-4 mb-4'
				>
					<Form.Item
						className='mt-1 justify-content-center'
						name='brand'
						rules={[
							{
								required: true,
								message: 'Merk harus diisi!',
							},
							{
								min: 3,
								message: 'Merk harus diisi minimal 3 huruf atau angka',
							},
						]}
						a
					>
						<Input />
					</Form.Item>
				</List>

				<List
					header={
						<div>
							Harga<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mt-4 mb-4'
				>
					<Form.Item
						name='price'
						className='mt-1 justify-content-center'
						rules={[
							{
								required: true,
								message: 'Harga harus diisi!',
							},
							{
								pattern: new RegExp(/^[0-9]+$/),
								message: 'Harga harus diisi dengan Angka',
							},
						]}
						a
					>
						<Input />
					</Form.Item>
				</List>

				<List
					header={
						<div>
							Kategori<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mt-4 mb-4'
				>
					<Form.Item
						className='mt-1 justify-content-center'
						name='category'
						rules={[
							{
								required: true,
								message: 'Kategori harus diisi!',
							},
						]}
						a
					>
						<Select style={{ width: '100%' }}>
							{selector.categories &&
								selector.categories.map((row) => (
									<Select.Option value={row._id}> {row.name} </Select.Option>
								))}
						</Select>
					</Form.Item>
				</List>

				<List
					header={
						<div>
							Stok<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mt-4 mb-4'
				>
					<Form.Item
						className='mt-1 justify-content-center'
						name='countInStock'
						rules={[
							{
								required: true,
								message: 'Stok harus diisi!',
							},
							{
								pattern: new RegExp(/^[0-9]+$/),
								message: 'Stok harus diisi dengan Angka',
							},
						]}
						a
					>
						<Input style={{ width: '100%' }} />
					</Form.Item>
				</List>

				<Form.Item className='justify-content-end'>
					<Button
						type='primary'
						htmlType='submit'
						className='mr-3'
						size='large'
						shape='round'
					>
						Submit
					</Button>
					<Button
						htmlType='button'
						size='large'
						shape='round'
						onClick={onCancel}
					>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default FormTambahP;
