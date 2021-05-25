import React from 'react';
import { Descriptions, Image } from 'antd';

const DetailSupplier = (props) => {
	let data = props.data;

	return (
		<>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Nama'>{data.name}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Alamat'>{data.address}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Email'>{data.email}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='No Handphone'>{data.phone}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Nama Toko'>
					{data.marketName}
				</Descriptions.Item>
			</Descriptions>
		</>
	);
};

export default DetailSupplier;
