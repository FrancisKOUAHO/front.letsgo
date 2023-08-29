import { ReactElement } from 'react';
import Footer from '../components/footer/Footer';
import { NextPage } from 'next';
import Header from '../components/header/Header';

type LayoutProps = {
	children: ReactElement;
	title: string;
};

const Layout: NextPage<LayoutProps> = ({ children }) => {
	return (
		<>
			<div style={{ padding: '16px 0', backgroundColor: '#222222' }}>
				<Header customStyle={{ position: 'initial' }} />
			</div>
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
