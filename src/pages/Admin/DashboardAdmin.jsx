import React, { Component } from 'react';
import { Row, Card, Descriptions } from 'antd';
import moment from 'moment';
import 'moment/locale/id';
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	AreaChart,
	Area,
} from 'recharts';
import { connect } from 'react-redux';
import UIBlocker from 'react-ui-blocker';
import {
	getSuccessTransaction,
	getCountUser,
	getCountMarket,
} from '../../redux/admin/action/actionAdmin';

class DashboardAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		this.props.getSuccessTransaction();
		this.props.getCountUser();
		this.props.getCountMarket();
	}

	render() {
		const { successTransaction, allUser, allMarket } = this.props;
		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					isVisible={this.props.loading}
					message=''
				/>
				<Card className='mt-2'>
					<Row>
						<Card.Grid
							style={{ width: '30%', height: 'auto' }}
							className='mr-4 mb-3'
						>
							<Descriptions
								column={{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
								title='Total Pendapatan'
								layout='vertical'
								bordered
							>
								<Descriptions.Item>
									<p style={{ fontSize: '2em', fontWeight: 'bold' }}>
										{'Rp'}
										{this.props.totalT}
									</p>
								</Descriptions.Item>
							</Descriptions>
						</Card.Grid>{' '}
						<Card.Grid
							style={{ width: '30%', height: 'auto' }}
							className='mr-4 mb-3'
						>
							<Descriptions
								column={{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
								title='Total Pengguna'
								layout='vertical'
								bordered
							>
								<Descriptions.Item>
									<p style={{ fontSize: '2em', fontWeight: 'bold' }}>
										{allUser}
									</p>
								</Descriptions.Item>
							</Descriptions>
						</Card.Grid>
						<Card.Grid
							style={{ width: '30%', height: 'auto' }}
							className='mr-4 mb-3'
						>
							<Descriptions
								column={{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
								title='Total Toko'
								layout='vertical'
								bordered
							>
								<Descriptions.Item>
									<p style={{ fontSize: '2em', fontWeight: 'bold' }}>
										{allMarket}
									</p>
								</Descriptions.Item>
							</Descriptions>
						</Card.Grid>
						<Card.Grid style={{ width: '100%', height: 'auto' }}>
							<ResponsiveContainer width='100%' height={350}>
								<AreaChart width={500} height={300} data={successTransaction}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis
										dataKey='_id'
										tickFormatter={(str) => {
											return moment(str).format('MMMM');
										}}
									/>
									<YAxis />
									<Tooltip />
									<Legend verticalAlign='top' height={36} />
									<Area
										name='Statistik Pendapatan'
										dataKey='totalPrice'
										type='monotone'
										stroke='blue'
										fill='#f74e38'
									/>
									{/* <Bar dataKey='Transaksi_Berhasil' fill='#FFF500' /> */}
									{/* <Bar dataKey='Transaksi_Gagal' fill='#FF0000' /> */}
								</AreaChart>
							</ResponsiveContainer>
						</Card.Grid>
					</Row>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		successTransaction,
		allUser,
		allMarket,
		totalT,
		loading,
		error,
	} = state.reducerAdmin;
	return { successTransaction, allMarket, allUser, totalT, loading, error };
};
export default connect(mapStateToProps, {
	getSuccessTransaction,
	getCountUser,
	getCountMarket,
})(DashboardAdmin);
