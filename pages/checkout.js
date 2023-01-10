import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CartItemList from '../components/mealCart/cartItemList';
import { UserContext } from '../store/UserContext';
import { useColors } from '../hooks/useColors';
import CheckoutList from '../components/checkout/checkoutList';

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
			<Box
				display='flex'
				flexDirection={'column'}
				alignItems='center'
				justifyContent='flex-start'
				width='100%'
				p='20px'
				border={'1px solid black'}>
				<Box>
					<Typography variant='h2'>
						Total costs with shipping and handling
					</Typography>
					<Typography>details</Typography>
				</Box>
				<Box
					sx={{
						borderTop: `1px solid ${colors.orangeAccent[900]}`,
						pt: '20px',
					}}
					display={'flex'}
					width='100%'>
					<Box
						display={'flex'}
						width='100%'
						alignItems='center'
						justifyContent='space-between'>
						<Button variant='contained' color='success'>
							Pay
						</Button>
						<Typography textAlign={'end'}>
							Total: ${Math.round(state.cartTotalPrice * 100) / 100}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Checkout;
