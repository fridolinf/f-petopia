import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
	Layout,
	Menu,
	Avatar,
	Typography,
	Badge,
	Button,
	Dropdown,
} from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	MailOutlined,
	DashboardOutlined,
	DownOutlined,
	QuestionCircleOutlined,
	ProfileOutlined,
} from '@ant-design/icons';
import { session } from '../utils/session';

const { Header, Sider, Content } = Layout;

const { Text } = Typography;

const menu = (
	<Menu>
		<Menu.Item danger>
			<Link to='/admin/kelolauser'>Kelola User</Link>
		</Menu.Item>
		<Menu.Item danger>
			<Link to='/admin/verifikasi'>Verifikasi Supplier</Link>
		</Menu.Item>
	</Menu>
);

class LayoutAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: true,
			collapsed: false,
		};
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
								<Avatar className='mt-3 mr-3' size={40}></Avatar>
								<span style={{ marginTop: 20 }}>
									<Text style={{ color: 'black' }}>Nama Toko</Text>
								</span>
							</div>
						)}
						<Menu
							style={{ background: '#f74e38' }}
							mode='inline'
							defaultSelectedKeys={['1']}
						>
							<Menu.Item key='1' icon={<DashboardOutlined />}>
								<NavLink
									className='nav-text'
									style={{ color: 'black' }}
									to='/admin'
								>
									Dashboard
								</NavLink>
							</Menu.Item>
							<Menu.Item key='2' icon={<UserOutlined />}>
								<NavLink className='nav-text' style={{ color: 'black' }} to='/'>
									Kelola User
									<Dropdown overlay={menu}>
										<a href='/' onClick={(e) => e.preventDefault()}>
											<DownOutlined style={{ color: 'black' }} />
										</a>
									</Dropdown>
								</NavLink>
							</Menu.Item>
							<Menu.Item key='3' icon={<QuestionCircleOutlined />}>
								<NavLink
									className='nav-text'
									style={{ color: 'black' }}
									to='/admin/kelolafaq'
								>
									Kelola FAQ
								</NavLink>
							</Menu.Item>
							<Menu.Item key='4' icon={<ProfileOutlined />}>
								<NavLink
									className='nav-text'
									style={{ color: 'black' }}
									to='/admin/kelolaartikel'
								>
									Kelola Artikel
								</NavLink>
							</Menu.Item>
						</Menu>
						<Button
							onClick={this.onlogout}
							style={{ width: '200px', background: '#f74e38', color: 'black' }}
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
							<div className={'float-right mr-4'}>
								<a href='/' className='mr-3' style={{ color: 'black' }}>
									Help guides
								</a>
								<a href='/'>
									<span style={{ color: 'black' }} className='mr-1 mt-5'>
										Inbox
									</span>
									<Badge count={5}>
										<MailOutlined
											style={{ fontSize: '30px', color: 'black' }}
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
export default LayoutAdmin;
