import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardTitle, Card, CardBody, Col, Row } from 'reactstrap';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import logo from '../assets/images/logo.jpeg';
import '../login.css';
import { loginUser } from '../redux/actions';
import { Redirect } from 'react-router-dom';
import { getLoggedInUser, isUserAuthenticated } from '../utils/session';

const layout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		offset: 1,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 1,
		span: 16,
	},
};

class Login extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.body.classList.add('loginbg');
	}

	handleSubmit = (value) => {
		this.props.loginUser(value.email, value.password);
	};

	renderRedirectToRoot = () => {
		const isAuth = isUserAuthenticated();
		const loggedInUser = getLoggedInUser();
		if (isAuth) {
			switch (loggedInUser.isAdmin) {
				case '1':
					return <Redirect to='/admin' />;
				case '2':
					return <Redirect to='/supplier' />;
				default:
					break;
			}
		}
	};

	render() {
		const isAuth = isUserAuthenticated();
		return (
			<>
				{this.renderRedirectToRoot()}
				{!isAuth && (
					<div className='d-flex justify-content-center vh-100'>
						<Row>
							<Col className='my-auto' lg={5}>
								<img
									style={{ height: '50%', width: '100%' }}
									src={logo}
									alt='logo'
								/>
							</Col>
							<Col className='my-auto' lg={7}>
								<Card
									style={{ height: '100%', width: '100%' }}
									className=' shadow-lg mx-5'
								>
									<CardBody>
										<CardTitle tag='h3' className='text-center'>
											Login
										</CardTitle>
										{this.props.error && (
											<Alert
												className='mb-3'
												message={this.props.error}
												type='error'
												showIcon
											/>
										)}
										<Form
											{...layout}
											onFinish={this.handleSubmit}
											initialValues={{ remember: true }}
										>
											<Form.Item
												label='Email'
												name='email'
												rules={[
													{
														required: true,
														message: 'Masukkan email anda',
													},
												]}
											>
												<Input />
											</Form.Item>

											<Form.Item
												label='Password'
												name='password'
												rules={[
													{
														required: true,
														message: 'Masukkan password anda',
													},
												]}
											>
												<Input.Password />
											</Form.Item>

											<Form.Item
												{...tailLayout}
												name='remember'
												valuePropName='checked'
											>
												<Checkbox>Ingat Saya</Checkbox>
											</Form.Item>

											<Form.Item {...tailLayout}>
												<Button type='primary' htmlType='submit'>
													Submit
												</Button>
											</Form.Item>
										</Form>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</div>
				)}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	const { user, loading, error, isAuthenticated } = state.LoginReducers;
	return { user, loading, error, isAuthenticated };
};
export default connect(mapStateToProps, { loginUser })(Login);
