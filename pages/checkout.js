import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CartItemList from '../components/mealCart/cartItemList';
import { UserContext } from '../store/UserContext';
import { useColors } from '../hooks/useColors';
import CheckoutList from '../components/checkout/checkoutList';
import CheckoutTotals from '../components/checkout/checkoutTotals';

const Checkout = () => {
	const { state } = useContext(UserContext);
	const { colors } = useColors();
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
