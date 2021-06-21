import React from 'react';
import { Descriptions, Image } from 'antd';

const FormDetailArtikel = (props) => {
	let data = props.data;

	return (
		<>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item className='text-center'>
					<Image width={'30%'} src={data.image1} />
				</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Judul'>{data.title}</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Deskripsi'>
					<div
						dangerouslySetInnerHTML={{
							__html: data.descriptiption,
						}}
					></div>
				</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Isi Artikel'>
					<div
						dangerouslySetInnerHTML={{
							__html: data.isi,
						}}
					></div>
				</Descriptions.Item>
			</Descriptions>
		</>
	);
};

export default FormDetailArtikel;
