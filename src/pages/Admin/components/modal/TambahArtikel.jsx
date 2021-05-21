import React from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const TambahArtikel = () => {
	const onFinish = (values) => {};
	const formItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};
	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
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
				<Form.Item label='Judul'>
					<Input />
				</Form.Item>
				<Form.Item label='Isi'>
					<Input.TextArea />
				</Form.Item>
				<Form.Item
					name='upload gambar'
					label='Upload'
					valuePropName='fileList'
					getValueFromEvent={normFile}
					extra='gambar.jpg'
				>
					<Upload name='logo' action='/upload.do' listType='picture'>
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>
			</Form>
		</>
	);
};

export default TambahArtikel;
