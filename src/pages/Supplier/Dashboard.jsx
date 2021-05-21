import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { Row } from 'reactstrap';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{
		name: 'Januari',
		Jumlah_Transaksi: 5,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Februari',
		Jumlah_Transaksi: 30,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Maret',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'April',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Mei',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Juni',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Juli',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Agustus',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'September',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Oktober',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'November',
		Jumlah_Transaksi: 40,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
	{
		name: 'Desember',
		Jumlah_Transaksi: 90,
		Transaksi_Gagal: 20,
		Transaksi_Berhasil: 10,
	},
];
const data2 = [
	{
		name: 'Januari',
		Data_Pemasukan: 10000000,
	},
	{
		name: 'Februari',
		Data_Pemasukan: 9000000,
	},
	{
		name: 'Maret',
		Data_Pemasukan: 8000000,
	},
	{
		name: 'April',
		Data_Pemasukan: 7000000,
	},
	{
		name: 'Mei',
		Data_Pemasukan: 6000000,
	},
	{
		name: 'Juni',
		Data_Pemasukan: 5000000,
	},
	{
		name: 'Juli',
		Data_Pemasukan: 4000000,
	},
	{
		name: 'Agustus',
		Data_Pemasukan: 3000000,
	},
	{
		name: 'September',
		Data_Pemasukan: 2000000,
	},
	{
		name: 'Oktober',
		Data_Pemasukan: 1000000,
	},
	{
		name: 'November',
		Data_Pemasukan: 500000,
	},
	{
		name: 'Desember',
		Data_Pemasukan: 10000,
	},
];
export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<Row className='d-flex justify-content-center'>
					<h3>Data Penjualan</h3>
				</Row>
				<DatePicker className='float-right' picker='year' />
				<ResponsiveContainer width='100%' height={350}>
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend verticalAlign='top' height={36} />
						<Bar dataKey='Jumlah_Transaksi' fill='#00F0FF' />
						<Bar dataKey='Transaksi_Berhasil' fill='#FFF500' />
						<Bar dataKey='Transaksi_Gagal' fill='#FF0000' />
					</BarChart>
				</ResponsiveContainer>

				<Row className='d-flex justify-content-center mt-5'>
					<h3>Data Pemasukan</h3>
				</Row>
				<DatePicker className='float-right' picker='year' />
				<ResponsiveContainer width='100%' height={350}>
					<BarChart
						width={500}
						height={300}
						data={data2}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend verticalAlign='top' height={36} />
						<Bar dataKey='Data_Pemasukan' fill='#00F0FF' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	}
}
