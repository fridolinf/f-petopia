import React from 'react';
import { Descriptions, Image } from 'antd';

const DetailFaq = (props) => {
	let data = props.data;

	return (
		<>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Pertanyaan'>
					{data.pertanyaan}
				</Descriptions.Item>
			</Descriptions>
			<Descriptions bordered layout='vertical'>
				<Descriptions.Item label='Jawaban'>
					<div
						dangerouslySetInnerHTML={{
							__html: data.jawaban,
						}}
					></div>
				</Descriptions.Item>
			</Descriptions>
		</>
	);
};

export default DetailFaq;
