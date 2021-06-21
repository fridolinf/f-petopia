import React, { useState } from 'react';
import { Form, Input, Button, Upload, List } from 'antd';
import UIBlocker from 'react-ui-blocker';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import ReactQuill from 'react-quill';

const FormEditArtikel = (props) => {
	const [textE, setTextE] = useState(undefined);
	let data = props.data;

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

	if (data.image1 === undefined) {
		return (
			<UIBlocker
				theme='bounce' // default
				isVisible={true}
				message=''
			/>
		);
	}

	const handleChange = (value) => {
		setTextE(value);
	};
	const modules = {
		imageCompress: {
			quality: 0.7, // default
			maxWidth: 300, // default
			maxHeight: 300, // default
			imageType: 'image/jpeg', // default
			debug: true, // default
		},
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
			['link', 'image'],
			['clean'],
			[
				{ align: '' },
				{ align: 'center' },
				{ align: 'right' },
				{ align: 'justify' },
			],
		],
	};

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'align',
	];

	return (
		<>
			<Form
				name='validate_other'
				{...formItemLayout}
				onFinish={onConfirm}
				autoComplete='off'
				initialValues={{
					title: data.title,
					description: data.description,
					isi: data.isi,
				}}
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
						rules={[
							{
								required: true,
								message: 'Gambar harus diisi!',
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
								min: 10,
								message: 'Judul harus lebih dari 10 huruf',
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
								min: 30,
								message: 'Deskripsi harus lebih dari 30 huruf',
							},
						]}
						a
					>
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
					<Form.Item
						name='isi'
						className='mt-1 justify-content-center'
						rules={[
							{
								required: true,
								message: 'Isi Artikel harus diisi!',
							},
							{
								min: 200,
								message: 'Isi Artikel harus lebih dari 200 huruf',
							},
						]}
						a
					>
						<ReactQuill
							value={textE || ''}
							onChange={(e) => handleChange(e)}
							theme='snow'
							modules={modules}
							formats={formats}
						/>
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

export default FormEditArtikel;
