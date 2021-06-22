import React from 'react';
import { Tabs, Badge } from 'antd';
import TabPesananBaru from './components/Pesanan/TabPesananBaru';
import TabPesananDikrim from './components/Pesanan/TabPesananDikirim';
import TabPesananSelesai from './components/Pesanan/TabPesananSelesai';
import { connect } from 'react-redux';
import {
	getOrderNewList,
	getOrderSentList,
	getOrderDoneList,
} from '../../redux/admin/action/actionAdmin';

const { TabPane } = Tabs;

class KelolaPesanan extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.getOrderNewList();
		this.props.getOrderSentList();
		this.props.getOrderDoneList();
	}

	render() {
		const { size } = this.state;
		return (
			<div>
				<Tabs centered defaultActiveKey='1' type='card' size={size}>
					<TabPane
						tab={
							<span>
								Pesanan Baru
								{/* <Badge className='ml-1' count={11} overflowCount={10} />{' '} */}
							</span>
						}
						key='1'
					>
						<TabPesananBaru data={this.props.newOrders} />
					</TabPane>

					<TabPane
						tab={
							<span>
								Pesanan Diproses
								{/* <Badge className='ml-1' count={11} overflowCount={10} />{' '} */}
							</span>
						}
						key='2'
					>
						<TabPesananDikrim data={this.props.sentOrders} />
					</TabPane>

					<TabPane
						tab={
							<span>
								Pesanan Selesai
								{/* <Badge className='ml-1' count={11} overflowCount={10} />{' '} */}
							</span>
						}
						key='3'
					>
						<TabPesananSelesai data={this.props.doneOrders} />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const { newOrders, sentOrders, doneOrders, loading, error } = state.reducerAdmin;
	return { newOrders, sentOrders, doneOrders, loading, error };
};
export default connect(mapStateToProps, {
	getOrderNewList,
	getOrderSentList,
	getOrderDoneList,
})(KelolaPesanan);
