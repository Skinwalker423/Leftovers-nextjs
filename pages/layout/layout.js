import React from 'react';
import NavBar from '../../components/navbar/NavBar';

const Layout = ({ children }) => {
	return (
		<div>
			<header>
				<NavBar />
			</header>
			<main>{children}</main>
		</div>
	);
};

export default Layout;