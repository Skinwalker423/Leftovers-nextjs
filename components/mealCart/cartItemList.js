import React, { useContext, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box, Typography } from '@mui/material';
import CartItem from './cartItem';

const CartItemList = () => {
	const { state } = useContext(UserContext);
	const { userCartlist } = state;
	const [totatPrice, setTotalPrice] = useState(0);
	if (!userCartlist) {
		return 'Loading...';
	}

	console.log('this is cart items array', userCartlist);
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
		<Box>
			{cartList}
			<Typography
				textAlign={'end'}
				p={'20px'}
				sx={{ borderTop: '1px solid orange' }}>
				Total: ${Math.round(total * 100) / 100}
			</Typography>
		</Box>
	);
};

export default CartItemList;
