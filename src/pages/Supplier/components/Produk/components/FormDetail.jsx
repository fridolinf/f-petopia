import React from 'react';
import { Descriptions, Image } from 'antd';

const FormDetail = (props) => {
	let data = props.data;

	return (
		<>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item className='text-center'>
					<Image width={'50%'} src={data.image1} />
				</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Nama'>{data.name}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Deskripsi'>
					<div
						dangerouslySetInnerHTML={{
							__html: data.description,
						}}
					></div>
				</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Deskripsi Lebih'>
					<div
						dangerouslySetInnerHTML={{
							__html: data.richDescription,
						}}
					></div>
				</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Merk'>{data.brand}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Harga'>{data.price}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Kategori'>
					{data.category ? data.category.name : ''}
				</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Stok'>{data.countInStock}</Descriptions.Item>
			</Descriptions>
		</>
	);
};

export default FormDetail;
