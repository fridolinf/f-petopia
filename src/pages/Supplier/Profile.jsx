import React, { Component } from 'react';
import { Form, Row, Input, Button, Modal, Card, Avatar } from 'antd';
import {
	getDataSupplier,
	updateSupplier,
} from '../../redux/supplier/action/actionSupplier';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cobasvg from '../../assets/images/coba.svg';
import { connect } from 'react-redux';
import UIBlocker from 'react-ui-blocker';
import { Col } from 'reactstrap';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			id: this.props.user.userId,
			name: this.props.user.name,
			market: this.props.user.marketName,
			address: this.props.user.address,
			email: this.props.user.email,
			passwordHash: this.props.user.passwordHash,
			phone: this.props.user.phone,
		};
	}

	componentDidMount() {
		this.props.getDataSupplier();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.props.user) {
			this.setState({
				name: nextProps.user.name,
				market: nextProps.user.marketName,
				address: nextProps.user.address,
				email: nextProps.user.email,
				passwordHash: nextProps.user.passwordHash,
				phone: nextProps.user.phone,
			});
		}
	}

	// Edit Data
	onSubmitHandlerEdit = (value) => {
		let data = {
			name: value.name,
			address: value.address,
			phone: value.phone,
		};
		Modal.confirm({
			title: 'Apakah data yang diubah sudah sesuai?',
			icon: <ExclamationCircleOutlined />,
			content: 'Ketika klik Ok data akan diubah',
			onOk: () => {
				this.props.updateSupplier(data, this.state.id);
			},
			onCancel() {},
		});
	};

	render() {
		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					isVisible={this.props.loading}
					message=''
				/>

				<Row>
					<Col lg={8}>
						<Card hoverable='true'>
							<Form
								name='basic'
								initialValues={{
									name: this.state.name,
									market: this.state.market,
									address: this.state.address,
									email: this.state.email,
									passwordHash: this.state.passwordHash,
									phone: this.state.phone,
								}}
								layout='vertical'
								onFinish={this.onSubmitHandlerEdit}
							>
								<Form.Item label='Nama'>
									<Form.Item
										name='name'
										noStyle
										rules={[
											{
												required: true,
												message: 'Please input your username!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Form.Item>

								<Form.Item label='Nama Toko'>
									<Form.Item noStyle name='market'>
										<Input disabled />
									</Form.Item>
								</Form.Item>

								<Form.Item label='Alamat'>
									<Form.Item
										noStyle
										name='address'
										rules={[
											{
												required: true,
												message: 'Please input your username!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Form.Item>

								<Form.Item label='Email'>
									<Form.Item noStyle name='email'>
										<Input disabled />
									</Form.Item>
								</Form.Item>

								<Form.Item label='No Handphone'>
									<Form.Item
										noStyle
										name='phone'
										rules={[
											{
												required: true,
												message: 'Please input your username!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Form.Item>

								<Form.Item>
									<Button
										type='primary'
										className='float-right'
										htmlType='submit'
									>
										Ubah
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</Col>
					<Col lg={4}>
						<Card hoverable='true' bordered={false}>
							<Avatar
								style={{ width: '100%', height: 'auto' }}
								shape='square'
								src={cobasvg}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user, suppliers, loading, error } = state.reducerSupplier;
	return { user, suppliers, loading, error };
};
export default connect(mapStateToProps, {
	getDataSupplier,
	updateSupplier,
})(Profile);
