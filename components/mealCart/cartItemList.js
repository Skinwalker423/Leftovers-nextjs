import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box } from '@mui/material';
import CartItem from './cartItem';

const CartItemList = () => {
	const { state } = useContext(UserContext);
	const { userCartlist } = state;
	if (!userCartlist) {
		return 'Loading...';
	}

	console.log('this is cart items array', userCartlist);

	const cartList = userCartlist.map(
		({ id, foodItem, price, img, description }) => {
			return (
				<CartItem
					key={id}
					foodItem={foodItem}
					img={img}
					price={price}
					description={description}
				/>
			);
		}
	);

	return <Box>{cartList}</Box>;
};

export default CartItemList;
