import React from 'react';
import { Form, Input, Button } from 'antd';

import UIBlocker from 'react-ui-blocker';
import TextArea from 'antd/lib/input/TextArea';

const FormEditFaq = (props) => {
	let data = props.data;

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

	if (data.pertanyaan === undefined) {
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
					pertanyaan: data.pertanyaan,
					jawaban: data.jawaban,
				}}
			>
				<Form.Item
					label='Pertanyaan'
					name='pertanyaan'
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
				<Form.Item label='Jawaban' name='jawaban'>
					<TextArea showCount maxLength={100} size='large' />
				</Form.Item>
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

export default FormEditFaq;
