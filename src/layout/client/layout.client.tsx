import { Outlet } from 'react-router-dom';
import Footer from './footer.client';
import Header from './header.client';

const Layout = () => {
	return (
		<>
			<Header></Header>
			<Outlet></Outlet>
			<Footer></Footer>
		</>
	);
};

export default Layout;
