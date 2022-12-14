import React from 'react';
import { Box } from '@mui/material';
import CheckoutList from '../components/checkout/checkoutList';
import CheckoutTotals from '../components/checkout/checkoutTotals';

const Checkout = () => {
	return (
		<Box
			display='flex'
			width={'100%'}
			height='100vh'
			justifyContent={'space-evenly'}>
			<CheckoutList />
			<CheckoutTotals />
		</Box>
	);
};

export default Checkout;
