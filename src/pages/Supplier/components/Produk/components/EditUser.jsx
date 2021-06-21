import React, { useEffect } from 'react';
import { Form, Input, Button, Select, List } from 'antd';

import UIBlocker from 'react-ui-blocker';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';

const EditUser = (props) => {
	let data = props.data;
	console.log(data);
	const selector = useSelector((state) => state.reducerSupplier);
	const dispatch = useDispatch();
	useEffect(() => {}, [null]);

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
					address: data.address,
					email: data.email,
					passwordHash: data.passwordHash,
					phone: data.phone,
				}}
			>
				<List
					header={<div>Nama</div>}
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
					header={<div>Deskripsi</div>}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item
						name='address'
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
								max: 300,
								message: 'Deskripsi produk tidak bisa lebih dari 100 huruf',
							},
						]}
						a
					>
						<TextArea showCount maxLength={300} size='large' />
					</Form.Item>
				</List>

				<List
					header={<div>Deskripsi Penuh</div>}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item name='email' className='mt-1 justify-content-center'>
						<TextArea size='large' />
					</Form.Item>
				</List>

				<List
					header={<div>Merk</div>}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mt-4 mb-4'
				>
					<Form.Item
						className='mt-1 justify-content-center'
						name='passwordHash'
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
					header={<div>Harga</div>}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mt-4 mb-4'
				>
					<Form.Item
						name='phone'
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

export default EditUser;
