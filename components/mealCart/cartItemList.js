import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box, Typography } from '@mui/material';
import CartItem from './cartItem';

const CartItemList = ({ checkout }) => {
	const { state } = useContext(UserContext);
	const { userCartlist } = state;
	if (!userCartlist) {
		return 'Empty Cart...';
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
			height={{ xs: '50vh', md: '80%' }}
			width={'100%'}
			display={'flex'}
			overflow="auto"
			flexDirection="column"
			justifyContent={'flex-start'}
		>
			<Typography
				sx={{ mt: { xs: checkout ? '5rem' : '2rem', md: '2rem' } }}
				textAlign={'center'}
				variant="h2"
			>
				Meals
			</Typography>
			<Box
				sx={{
					px: {
						xs: '2em',
						md: '5em'
					},
					height: '100%',
					overflowY: 'auto'
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
