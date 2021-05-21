import React from 'react';
import { Form, Input } from 'antd';

const TambahFaq = () => {
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};
	const formItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};

	return (
		<>
			<Form
				name='validate_other'
				{...formItemLayout}
				onFinish={onFinish}
				initialValues={{
					'input-number': 3,
					'checkbox-group': ['A', 'B'],
					rate: 3.5,
				}}
			>
				<Form.Item label='Pertanyaan'>
					<Input />
				</Form.Item>
				<Form.Item label='Jawaban'>
					<Input.TextArea />
				</Form.Item>
			</Form>
		</>
	);
};

export default TambahFaq;
