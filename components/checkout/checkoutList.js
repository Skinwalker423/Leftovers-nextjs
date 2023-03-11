import React from 'react';
import CartItemList from '../mealCart/cartItemList';
import { Box } from '@mui/material';

const CheckoutList = () => {
	return (
		<Box width={'100%'} p='20px'>
			<CartItemList checkout={true} />
		</Box>
	);
};

export default CheckoutList;
