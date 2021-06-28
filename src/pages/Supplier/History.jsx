import React from 'react';
import { Tabs, Table, Tag, Card, Rate, Row, Col } from 'antd';
import UIBlocker from 'react-ui-blocker';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';
import { getOrderDoneList } from '../../redux/admin/action/actionAdmin';
import { connect } from 'react-redux';

export const sorter1 = (a, b) =>
	isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;

class History extends React.Component {
	state = { size: 'small' };

	componentDidMount() {
		this.props.getOrderDoneList();
	}

	render() {
		const sidebar = (
			<ul>
				{this.props.doneOrders.map((doneOrders) => (
					<Card
						className='mt-2 text-center'
						style={{ width: '500px' }}
						key={doneOrders.id}
						title={doneOrders.orderItems[0].product.category.name}
					>
						<p>{doneOrders.user.name}</p>
						<p>{doneOrders.orderItems[0].product.name}</p>
						<Rate
							className='mr-3'
							disabled
							value={doneOrders.orderItems[0].product.Quantityrating}
						></Rate>
						{moment(doneOrders.dateOrdered).format('LL')}
					</Card>
				))}
			</ul>
		);

		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					message=''
					loading={this.state.loading}
				/>
				<h3>Riwayat Pemesanan</h3>
				<Row className='mt-5'>
					<Col span={12} offset={6}>
						<Card className='justify-content-center' style={{ width: 640 }}>
							<p>{sidebar}</p>
						</Card>
					</Col>
				</Row>
				,
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { doneOrders, loading, error } = state.reducerAdmin;
	return { doneOrders, loading, error };
};
export default connect(mapStateToProps, {
	getOrderDoneList,
})(History);
