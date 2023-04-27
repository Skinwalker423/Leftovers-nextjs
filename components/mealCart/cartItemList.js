import React, { useContext, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box, Typography, Button } from '@mui/material';
import CartItem from './cartItem';

const CartItemList = ({ checkout }) => {
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
			height="80%"
			sx={{
				width: {
					xs: '100%'
				}
			}}
			display={'flex'}
			overflow="auto"
			flexDirection="column"
			justifyContent={checkout ? 'center' : 'flex-start'}
		>
			<Typography sx={{ my: '2em' }} textAlign={'center'} variant="h2">
				Meals
			</Typography>
			<Box
				sx={{
					px: {
						xs: '2em',
						md: '5em'
					}
				}}
			>
				{cartList.length ? (
					cartList
				) : (
					<Typography textAlign="center" variant="h2">
						No items in the cart
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default CartItemList;
