import React, { useContext } from 'react';
import { Box, Divider } from '@mui/material';
import CheckoutList from '../components/checkout/checkoutList';
import CheckoutTotals from '../components/checkout/checkoutTotals';
import Head from 'next/head';
import { UserContext } from '../store/UserContext';

const Checkout = () => {
	const { state } = useContext(UserContext);
	const { userCartlist } = state;

	return (
		<Box
			display='flex'
			width={'100%'}
			height='100vh'
			justifyContent={'space-evenly'}>
			<Head>
				<title>Checkout</title>
				<meta
					name='description'
					content='Checkout page. Confirm the meals, cost, and pay options before completing your order'
				/>
			</Head>
			<CheckoutList />
			<Divider />
			<CheckoutTotals />
		</Box>
	);
};

export default Checkout;
