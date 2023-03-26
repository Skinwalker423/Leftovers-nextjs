import React from 'react';
import NavBar from '../../components/layout/navbar/NavBar';
import { Suspense } from 'react';
import CustomLoader from '../../components/UI/Loader';

const Layout = ({ children }) => {
	return (
		<div>
			<header>
				<NavBar />
			</header>
			<Suspense fallback={<CustomLoader />}>
				<main>{children}</main>
			</Suspense>
		</div>
	);
};

export default Layout;
