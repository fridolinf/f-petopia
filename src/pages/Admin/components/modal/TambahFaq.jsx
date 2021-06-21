import React, { useState } from 'react';
import { Button, Form, Input, List } from 'antd';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import ImageCompress from 'quill-image-compress';

Quill.register('modules/imageCompress', ImageCompress);

const TambahFaq = (props) => {
	const formItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};

	const [textE, setTextE] = useState(undefined);

	const handleChange = (value) => {
		setTextE(value);
	};

	let onConfirm = props.onConfirm;

	let onCancel = props.onCancel;

	const modules = {
		imageCompress: {
			quality: 1, // default
			maxWidth: 700, // default
			maxHeight: 500, // default
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
				{...formItemLayout}
				initialValues={{
					pertanyaan: '',
					jawaban: '',
				}}
				onFinish={onConfirm}
			>
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
								message: 'Pertanyaan harus diisi!',
							},
							{
								min: 10,
								message: 'Pertanyaan harus lebih dari 10 huruf',
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
					<Form.Item
						name='jawaban'
						wrapperCol={13}
						className='mt-1'
						rules={[
							{
								required: true,
								message: 'Jawaban harus diisi!',
							},
							{
								min: 10,
								message: 'Jawaban harus lebih dari 10 huruf',
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

export default TambahFaq;
