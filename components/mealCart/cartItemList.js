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

	let total = 0;
	const cartList = userCartlist.map(
		({ id, foodItem, price, img, description, qty }) => {
			total += price * qty;
			return (
				<CartItem
					key={id}
					foodItem={foodItem}
					img={img}
					price={price}
					description={description}
					qty={qty}
				/>
			);
		}
	);

	return (
		<Box
			height='100%'
			display={'flex'}
			flexDirection='column'
			justifyContent='space-between'>
			<Box>
				{cartList.length ? (
					cartList
				) : (
					<Typography textAlign='center' variant='h2'>
						No items in the cart
					</Typography>
				)}
			</Box>
			<Box
				sx={{ borderTop: '1px solid orange' }}
				display={'flex'}
				alignItems='center'
				justifyContent='space-between'>
				<Button variant='contained' color='error'>
					Checkout
				</Button>
				<Typography textAlign={'end'} p={'20px'}>
					Total: ${Math.round(total * 100) / 100}
				</Typography>
			</Box>
		</Box>
	);
};

export default CartItemList;
