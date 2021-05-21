import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Avatar, Typography, Badge, Button } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	MailOutlined,
	DashboardOutlined,
	ShoppingCartOutlined,
	ShopOutlined,
} from '@ant-design/icons';
import { session } from '../utils/session';
import { getDataSupplier } from '../redux/supplier/action/actionSupplier';
import { connect } from 'react-redux';

const { Header, Sider, Content } = Layout;

const { Text } = Typography;

class LayoutSupplier extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: true,
			collapsed: false,
		};
	}

	componentDidMount() {
		this.props.getDataSupplier();
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	onlogout = () => {
		session(null);
		window.location.href = process.env.PUBLIC_URL + '/login';
	};

	render() {
		const { auth } = this.state;
		return (
			auth && (
				<Layout style={{ minHeight: '100vh' }}>
					<Sider
						style={{ background: '#74B3EE' }}
						trigger={null}
						collapsible
						collapsed={this.state.collapsed}
					>
						{this.state.collapsed ? (
							<a href='/'>
								{' '}
								<Avatar className='mt-3 ml-3' size={40}></Avatar>
							</a>
						) : (
							<div className='ml-2 d-flex mb-2'>
								<Avatar className='mt-3 mr-3' size={40}></Avatar>
								<span style={{ marginTop: 20 }}>
									<Text style={{ color: 'white' }}>{this.props.user.name}</Text>
								</span>
							</div>
						)}
						<Menu
							style={{ background: '#74B3EE' }}
							mode='inline'
							defaultSelectedKeys={['1']}
						>
							<Menu.Item key='1' icon={<UserOutlined />}>
								<NavLink
									className='nav-text'
									style={{ color: 'black' }}
									to='/supplier/profile'
								>
									Profile
								</NavLink>
							</Menu.Item>
							<Menu.Item key='2' icon={<DashboardOutlined />}>
								<NavLink
									className='nav-text'
									style={{ color: 'black' }}
									to='/supplier/dashboard'
								>
									Dashboard
								</NavLink>
							</Menu.Item>
							<Menu.Item key='3' icon={<ShoppingCartOutlined />}>
								<NavLink
									className='nav-text'
									style={{ color: 'black' }}
									to='/supplier/kelolapesanan'
								>
									Kelola Pesanan
								</NavLink>
							</Menu.Item>
							<Menu.Item key='4' icon={<ShopOutlined />}>
								<NavLink
									className='nav-text'
									style={{ color: 'black' }}
									to='/supplier/kelolaproduk'
								>
									Kelola Produk
								</NavLink>
							</Menu.Item>
						</Menu>
						<Button
							style={{ width: '200px', background: '#74B3EE', color: 'black' }}
							className='fixed-bottom'
							onClick={this.onlogout}
						>
							Keluar
						</Button>
					</Sider>
					<Layout className='site-layout'>
						<Header
							className='site-layout-background'
							style={{ padding: 0, background: '#74B3EE' }}
						>
							<div className={'float-right mr-4'}>
								<a href='/' className='mr-3' style={{ color: 'white' }}>
									Help guides
								</a>
								<a href='/'>
									<span style={{ color: 'white' }} className='mr-1 mt-5'>
										Inbox
									</span>
									<Badge count={5}>
										<MailOutlined
											style={{ fontSize: '30px', color: 'white' }}
										/>
									</Badge>
								</a>
							</div>
							{React.createElement(
								this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
								{
									className: 'trigger ml-3',
									onClick: this.toggle,
								}
							)}
						</Header>
						<Content
							className='site-layout-background'
							style={{
								margin: '24px 16px',
								padding: 24,
								minHeight: 280,
							}}
						>
							{this.props.children}
						</Content>
					</Layout>
				</Layout>
			)
		);
	}
}

const mapStateToProps = (state) => {
	const { user, loading, error } = state.reducerSupplier;
	return { user, loading, error };
};

export default connect(mapStateToProps, { getDataSupplier })(LayoutSupplier);
