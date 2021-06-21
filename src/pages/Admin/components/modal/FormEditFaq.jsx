import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import UIBlocker from 'react-ui-blocker';
import TextArea from 'antd/lib/input/TextArea';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import ImageCompress from 'quill-image-compress';

Quill.register('modules/imageCompress', ImageCompress);

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

	const [textE, setTextE] = useState(undefined);

	const handleChange = (value) => {
		setTextE(value);
	};

	if (data.pertanyaan === undefined) {
		return (
			<UIBlocker
				theme='bounce' // default
				isVisible={true}
				message=''
			/>
		);
	}

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
						{ required: true, message: 'Pertanyaan harus diisi!' },
						{
							min: 10,
							message: 'Pertanyaan harus lebih dari 10 huruf',
						},
					]}
					a
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Jawaban'
					wrapperCol={13}
					name='jawaban'
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
