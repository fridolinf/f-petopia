import React from 'react';
import { Form, Input } from 'antd';

const FormTambahK = () => {
	const onFinish = (values) => {};
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
				<Form.Item label='Nama Kategori'>
					<Input />
				</Form.Item>
			</Form>
		</>
	);
};

export default FormTambahK;
