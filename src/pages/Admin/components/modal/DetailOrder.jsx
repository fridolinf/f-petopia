import React from 'react';
import { Descriptions, Image, Col } from 'antd';

const DetailOrder = (props) => {
	let data = props.data;
	return (
		<>
			<Col>
				<hr />
				<div>DATA PESANAN</div>
				<hr />
				<Descriptions.Item>
					<Col span={8} offset={8}>
						<Image width={'100%'} height={'auto'} src={data.gambar} />
					</Col>
				</Descriptions.Item>
				<Descriptions bordered layout='horizontal'>
					<Descriptions.Item label='Id Pesanan'>{data.id}</Descriptions.Item>
				</Descriptions>
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Nama Produk'>
						{data.produk}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Pembayaran'>
						{data.payment}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Harga'>{data.totalPrice}</Descriptions.Item>
				</Descriptions>
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Tanggal Order'>
						{data.dateOrdered}
					</Descriptions.Item>
				</Descriptions>
				<hr />
				<div>DATA USER</div>
				<hr />
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Nama Pemesan'>
						{data.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Nomor Handphone'>
						{data.phone}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Alamat Pemesan'>
						{data.address}
					</Descriptions.Item>
				</Descriptions>
				<hr />
				<hr />
				<div>DATA MARKET</div>
				<hr />
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Nama Toko'>
						{data.marketName}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions bordered layout='horizontal' className='mt-2'>
					<Descriptions.Item label='Alamat Toko'>
						{data.marketAddress}
					</Descriptions.Item>
				</Descriptions>
			</Col>
		</>
	);
};

export default DetailOrder;
