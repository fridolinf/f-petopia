import React from 'react';
import { Form, Input, Button, Upload, Row, Col, List } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const FormTambahArtikel = (props) => {
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
							Upload Gambar<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
				>
					<Form.Item
						name='image1'
						className='justify-content-center mt-3 text-center'
					>
						<Upload
							listType='picture-card'
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
				</List>

				<List
					header={
						<div>
							Judul<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mt-4 mb-4'
				>
					<Form.Item
						className='mt-1 justify-content-center'
						name='title'
						rules={[
							{
								required: true,
								message: 'Judul harus diisi!',
							},
							{
								min: 7,
								message: 'Judul Produk harus lebih dari 7 huruf',
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
					<Form.Item name='description' className='mt-1 justify-content-center'>
						<TextArea showCount maxLength={100} size='large' />
					</Form.Item>
				</List>

				<List
					header={
						<div>
							Isi Artikel<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item name='isi' className='mt-1 justify-content-center'>
						<TextArea showCount maxLength={500} size='large' />
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
export default FormTambahArtikel;
