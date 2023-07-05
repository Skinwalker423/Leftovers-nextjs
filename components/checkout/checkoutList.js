import React from 'react';
import CartItemList from '../mealCart/cartItemList';
import { Box } from '@mui/material';
import { useColors } from '../../hooks/useColors';

const CheckoutList = () => {
	const { colors } = useColors();
	return (
		<Box width={'100%'} p="20px" sx={{ backgroundColor: colors.primary[900] }}>
			<CartItemList checkout={true} />
		</Box>
	);
};

export default CheckoutList;
