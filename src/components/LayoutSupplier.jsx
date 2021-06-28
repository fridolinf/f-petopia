import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Typography, Button } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	DashboardOutlined,
	ShoppingCartOutlined,
	ShopOutlined,
	HistoryOutlined,
} from '@ant-design/icons';
import { session } from '../utils/session';
import { getDataSupplier } from '../redux/supplier/action/actionSupplier';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const menuPindah = [
	{
		key: '1',
		label: 'Profile',
		path: '/supplier/profile',
		icon: <UserOutlined />,
	},
	{
		key: '2',
		label: 'Dashboard',
		path: '/supplier/dashboard',
		icon: <DashboardOutlined />,
	},
	{
		key: '3',
		label: 'KelolaPesanan',
		path: '/supplier/kelolapesanan',
		icon: <ShoppingCartOutlined />,
	},
	{
		key: '4',
		label: 'KelolaProduk',
		path: '/supplier/kelolaproduk',
		icon: <ShopOutlined />,
	},
	{
		key: '6',
		label: 'History',
		path: '/supplier/history',
		icon: <HistoryOutlined />,
	},
];

class LayoutSupplier extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: true,
			collapsed: false,
			selectedKeys: [this.props.location.pathname],
		};
	}

	// componentDidMount() {
	// 	this.props.getDataSupplier();
	// 	this.setState({
	// 		selectedKeys: menuPindah.find(
	// 			(_item) => _item.path === this.props.location.pathname
	// 		).key,
	// 	});
	// }

	componentDidUpdate(previousProps, previousState) {
		if (previousState.selectedKeys !== this.state.selectedKeys) {
			this.setState({
				selectedKeys: menuPindah.find(
					(_item) => _item.path === this.props.location.pathname
				).key,
			});
		}
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	onlogout = () => {
		session(null);
		window.location.href = '/login';
	};

	onClickMenu = (item) => {
		const path = menuPindah.find((_item) => _item.path === item.path);
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
							<div className='ml-2 d-flex mb-2'>
								<span style={{ marginTop: 20 }}>
									<Text style={{ color: 'black' }}></Text>
								</span>
							</div>
						) : (
							<div className='ml-2 d-flex mb-2'>
								<span
									style={{
										marginTop: 20,
										marginLeft: 10,
										textShadow: '2px 2px 5px blue',
										fontWeight: 'bold',
									}}
								>
									<Text style={{ color: 'black' }}>
										{this.props.user.marketName}
									</Text>
								</span>
							</div>
						)}
						<Menu
							onClick={this.onClickMenu}
							selectedKeys={[this.props.location.pathname]}
							style={{ background: '#74B3EE' }}
							mode='inline'
						>
							{menuPindah.map((item) => (
								<>
									<Menu.Item key={item.path} icon={item.icon}>
										<NavLink
											className='nav-text'
											style={{ color: 'black' }}
											to={item.path}
										>
											{item.label}
										</NavLink>
									</Menu.Item>
								</>
							))}
						</Menu>
						<Button
							style={{
								width: '200px',
								background: '#74B3EE',
								color: 'black',
								zIndex: 1,
							}}
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
								<a href='/supplier/faq'>
									<Text
										strong
										style={{ color: 'black', fontSize: '1.2em' }}
										className='mr-1'
										underline='true'
									>
										FAQ
									</Text>
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

export default connect(mapStateToProps, { getDataSupplier })(
	withRouter(LayoutSupplier)
);
