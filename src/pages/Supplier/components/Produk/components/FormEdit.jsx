import React, { useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload } from 'antd';

import UIBlocker from 'react-ui-blocker';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { getDataCategories } from '../../../../../redux/supplier/action/actionSupplier';

const FormEdit = (props) => {
	let data = props.data;

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

	if (data.name === undefined) {
		return (
			<UIBlocker
				theme='bounce' // default
				isVisible={true}
				message=''
			/>
		);
	}

	return (
		<>
			<Form
				name='validate_other'
				{...formItemLayout}
				onFinish={onConfirm}
				autoComplete='off'
				initialValues={{
					name: data.name,
					description: data.description,
					richDescription: data.richDescription,
					brand: data.brand,
					price: data.price,
					category: data.category._id,
					countInStock: data.countInStock,
				}}
			>
				<Form.Item
					label='Nama'
					name='name'
					rules={[
						{ required: true, message: 'Nama harus diisi!' },
						{
							min: 7,
							message: 'Nama Produk harus lebih dari 7 huruf',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label='Deskripsi' name='description'>
					<TextArea showCount maxLength={100} size='large' />
				</Form.Item>
				<Form.Item label='Deskripsi Penuh' name='richDescription'>
					<TextArea showCount maxLength={500} size='large' />
				</Form.Item>
				<Form.Item name='image1' label='Upload'>
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
				<Form.Item name='image2' label='Upload'>
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
				<Form.Item name='image3' label='Upload'>
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
				<Form.Item name='image4' label='Upload'>
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
				<Form.Item label='Merk' name='brand'>
					<Input />
				</Form.Item>
				<Form.Item label='Harga' name='price'>
					<Input />
				</Form.Item>
				<Form.Item label='Kategori' name='category'>
					<Select style={{ width: '50%' }}>
						{selector.categories &&
							selector.categories.map((row) => (
								<Select.Option value={row._id}> {row.name} </Select.Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item label='Stok' name='countInStock'>
					<InputNumber />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
					<Button htmlType='button' onClick={onCancel}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default FormEdit;
