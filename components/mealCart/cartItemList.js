import React, { useContext, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box, Typography, Button } from '@mui/material';
import CartItem from './cartItem';

const CartItemList = () => {
	const { state } = useContext(UserContext);
	const { userCartlist } = state;
	if (!userCartlist) {
		return 'Loading...';
	}
	//sorting the meal items to keep the list consitent when adding/removing items.
	//mapping the sorted cart items
	//calculating the totals at the same time
	const cartList = userCartlist
		.sort((a, b) => a.id - b.id)
		.map((item) => {
			return <CartItem key={item.id} meal={item} />;
		});

	return (
		<Box
			height='80%'
			display={'flex'}
			flexDirection='column'
			justifyContent='space-between'>
			<Typography sx={{ mb: '10px' }} textAlign={'center'} variant='h2'>
				Meals
			</Typography>
			<Box>
				{cartList.length ? (
					cartList
				) : (
					<Typography textAlign='center' variant='h2'>
						No items in the cart
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default CartItemList;
