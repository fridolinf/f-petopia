import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Avatar, Typography, Button } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	DashboardOutlined,
	TeamOutlined,
	QuestionCircleOutlined,
	ProfileOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { session } from '../utils/session';
import logo from '../assets/images/logo.jpeg';
import { withRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const { Text } = Typography;

const menuPindah = [
	{
		key: '1',
		label: 'Dashboard',
		path: '/admin',
		icon: <DashboardOutlined />,
	},
	{
		key: '2',
		label: 'Lihat Transaksi',
		path: '/admin/lihattransaksi',
		icon: <ShoppingCartOutlined />,
	},
	{
		key: '3',
		label: 'Kelola User',
		path: '/admin/kelolauser',
		icon: <UserOutlined />,
	},
	{
		key: '4',
		label: 'Verifikasi',
		path: '/admin/verifikasi',
		icon: <TeamOutlined />,
	},
	{
		key: '5',
		label: 'Kelola Faq',
		path: '/admin/kelolafaq',
		icon: <QuestionCircleOutlined />,
	},
	{
		key: '6',
		label: 'Kelola Artikel',
		path: '/admin/kelolaartikel',
		icon: <ProfileOutlined />,
	},
];

class LayoutAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: true,
			collapsed: false,
			selectedKeys: [this.props.location.pathname],
		};
	}

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
		window.location.href = process.env.PUBLIC_URL + '/login';
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
						style={{ background: '#f74e38' }}
						trigger={null}
						collapsible
						collapsed={this.state.collapsed}
					>
						{' '}
						{this.state.collapsed ? (
							<a href='/'>
								<Avatar className='mt-3 ml-3' size={40}></Avatar>
							</a>
						) : (
							<div className='ml-2 d-flex mb-2'>
								<Avatar className='mt-3 mr-3' size={40} src={logo}></Avatar>
								<span style={{ marginTop: 20 }}>
									<Text style={{ color: 'black' }}>ADMIN</Text>
								</span>
							</div>
						)}
						<Menu
							style={{ background: '#f74e38' }}
							mode='inline'
							selectedKeys={[this.props.location.pathname]}
							onClick={menuPindah}
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
							onClick={this.onlogout}
							style={{
								width: '200px',
								background: '#f74e38',
								color: 'black',
								zIndex: 1,
							}}
							className='fixed-bottom'
						>
							Keluar
						</Button>
					</Sider>
					<Layout className='site-layout'>
						<Header
							className='site-layout-background'
							style={{ padding: 0, background: '#f74e38' }}
						>
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
export default withRouter(LayoutAdmin);
