import './index.scss';
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LayoutHeaderAdmin from './header.admin';
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: JSX.Element,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem(<Link to={'/admin'}>Home</Link>, 'home', <PieChartOutlined />),
	getItem(
		<Link to={'/admin/category'}>Category</Link>,
		'category',
		<DesktopOutlined />,
	),
	getItem(<Link to={'/admin/brand'}>Brand</Link>, 'brand', <FileOutlined />),
];

const LayoutAdmin = () => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					className='hidden lg:block'>
					<div className='demo-logo-vertical' />
					<Menu
						style={{
							marginTop: '60px',
						}}
						theme='dark'
						defaultSelectedKeys={['home']}
						mode='inline'
						items={items}
					/>
				</Sider>
				<Layout>
					<LayoutHeaderAdmin></LayoutHeaderAdmin>
					<Content style={{ margin: '0 16px' }}>
						<div
							style={{
								padding: 24,
								marginTop: 20,
								minHeight: 360,
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
							}}>
							<Outlet></Outlet>
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default LayoutAdmin;
