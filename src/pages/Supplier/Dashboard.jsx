import React, { Component } from 'react';
import {
	BarChart,
	Line,
	LineChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { getIncome } from '../../redux/supplier/action/actionSupplier';
import { connect } from 'react-redux';
import UIBlocker from 'react-ui-blocker';
import { Card, Row, Descriptions, Button, Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/id';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.getIncome();
		// this.props.getTransactions();
	}
	render() {
		const { income, transactions } = this.props;
		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					isVisible={this.props.loading}
					message=''
				/>

				<Card className='mb-3'>
					<Row className='d-flex justify-content-center mb-3'>
						<h3>Data Penghasilan</h3>
					</Row>

					<Row>
						<Card.Grid style={{ width: '30%', height: '50%' }} className='mr-4'>
							<Descriptions
								column={{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
								title='Informasi Saldo'
								layout='vertical'
								bordered
							>
								<Descriptions.Item label='Saldo'>
									<p style={{ fontSize: '2em', fontWeight: 'bold' }}>
										{'Rp'}
										{this.props.totalPrice}
									</p>
								</Descriptions.Item>
							</Descriptions>
							<Button
								className='mt-2 float-right'
								style={{ backgroundColor: '#dbdbdb' }}
								href='https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=petopia.admin@gmail.com'
							>
								Tarik Dana
							</Button>
							{/* <Button
								onClick={(e) => {
									e.stopPropagation();
									this.showModal();
								}}
								className='float-right mt-3'
								style={{
									fontWeight: 'bold',
									background: 'orange',
									color: 'white',
								}}
							>
								Tarik Dana
							</Button> */}
						</Card.Grid>
						<Card.Grid
							className='ml-4'
							style={{ width: '65%', height: 'auto' }}
						>
							<ResponsiveContainer width='100%' height={490}>
								<LineChart width={500} height={400} data={income}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis
										dataKey='_id'
										tickFormatter={(str) => {
											return moment(str).format('MMMM');
										}}
									/>
									<YAxis />
									<Tooltip />
									<Legend
										wrapperStyle={{
											paddingBottom: '1%',
										}}
										verticalAlign='top'
										layout='vertical'
									/>
									<Line
										type='monotone'
										name='Jumlah Penghasilan'
										dataKey='totalPrice'
										stroke='#8884d8'
									/>
								</LineChart>
							</ResponsiveContainer>
						</Card.Grid>
					</Row>
				</Card>

				{/* <Card className='mt-2'>
					<Row className='justify-content-center mb-4'>
						<h3>Data Transaksi</h3>
					</Row>
					<Row>
						<Card.Grid
							style={{ width: '30%', height: 'auto' }}
							className='mr-4 float-left'
						>
							<Descriptions
								column={{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
								title='Total Transaksi'
								layout='vertical'
								bordered
							>
								<Descriptions.Item>
									<p style={{ fontSize: '2em', fontWeight: 'bold' }}>
										{'Rp'}
										{this.props.totalQuantity}
									</p>
								</Descriptions.Item>
							</Descriptions>
						</Card.Grid>
						<Card.Grid
							className='ml-4'
							style={{ width: '65%', height: 'auto' }}
						>
							<ResponsiveContainer width='100%' height={400}>
								<BarChart
									data={transactions}
									margin={{
										top: 5,
										bottom: 5,
									}}
								>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='dateOrdered2' />
									<YAxis />
									<Tooltip />
									<Legend verticalAlign='top' height={36} />
									<Bar
										barSize={30}
										dataKey='quantity'
										name='Jumlah Transaksi'
										fill='#00F0FF'
									/>
								</BarChart>
							</ResponsiveContainer>
						</Card.Grid>
					</Row>
				</Card> */}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const {
		income,
		totalPrice,
		totalQuantity,
		loading,
		error,
	} = state.reducerSupplier;
	return { income, totalPrice, totalQuantity, loading, error };
};
export default connect(mapStateToProps, {
	getIncome,
})(Dashboard);
