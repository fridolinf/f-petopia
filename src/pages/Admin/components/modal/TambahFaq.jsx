import React from 'react';
import { Button, Form, Input, List } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const TambahFaq = (props) => {
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

	return (
		<>
			<Form {...formItemLayout} onFinish={onConfirm}>
				<List
					header={
						<div>
							Pertanyaan<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item
						className='mt-1 justify-content-center'
						name='pertanyaan'
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
							Jawaban<span style={{ color: 'red' }}>*</span>
						</div>
					}
					size='small'
					bordered
					style={{ backgroundColor: '#ffffff' }}
					className='mb-4'
				>
					<Form.Item name='jawaban' className='mt-1 justify-content-center'>
						<TextArea showCount maxLength={100} size='large' />
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

export default TambahFaq;
