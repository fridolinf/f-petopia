import React from 'react';
import { Tabs } from 'antd';
import TabHabisPakai from './components/Produk/TabHabisPakai';
import TabPetHotel from './components/Produk/TabPetHotel';
import TabPetGrooming from './components/Produk/TabPetGrooming';
import {
	getDataProducts,
	onLocationChange,
} from '../../redux/supplier/action/actionSupplier';
import { connect } from 'react-redux';

const { TabPane } = Tabs;

class KelolaProduk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.onLocationChange('location', 'habispakai');
		this.props.getDataProducts();
	}

	handleTabs = (key) => {
		switch (key) {
			case '1':
				this.props.onLocationChange('location', 'habispakai');
				this.props.getDataProducts();
				break;
			case '2':
				this.props.onLocationChange('location', 'hotel');
				this.props.getDataProducts();
				break;
			case '3':
				this.props.onLocationChange('location', 'grooming');
				this.props.getDataProducts();
				break;
			default:
				break;
		}
	};

	render() {
		return (
			<div>
				<h3 className={'text-center'}>HALAMAN DAFTAR PRODUK</h3>
				<Tabs
					centered
					defaultActiveKey='1'
					size={'large'}
					style={{ marginBottom: 32 }}
					onChange={this.handleTabs}
				>
					<TabPane tab='Habis Pakai' key='1'>
						<TabHabisPakai data={this.props.products} />
					</TabPane>

					<TabPane tab='Pet Hotel' key='2'>
						<TabPetHotel data={this.props.products} />
					</TabPane>

					<TabPane tab='Pet Grooming' key='3'>
						<TabPetGrooming data={this.props.products} />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const { products, loading, error } = state.reducerSupplier;
	return { products, loading, error };
};
export default connect(mapStateToProps, { getDataProducts, onLocationChange })(
	KelolaProduk
);
