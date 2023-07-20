import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/layout/navbar/NavBar';
import CustomLoader from '../../components/UI/Loader';

const Layout = ({ children }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleLoading = () => {
			setLoading(false);
		};
		const handleStart = () => {
			setLoading(true);
		};
		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleLoading);
		router.events.on('routeChangeError', handleLoading);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleLoading);
			router.events.off('routeChangeError', handleLoading);
		};
	}, [router]);
	return (
		<>
			<NavBar />
			<main>
				{children}
				{loading && <CustomLoader color="error" />}
			</main>
		</>
	);
};

export default Layout;
