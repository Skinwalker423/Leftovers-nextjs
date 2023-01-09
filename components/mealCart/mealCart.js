import { Paper, Box, Button, Typography } from '@mui/material';
import CartItemList from './cartItemList';
import { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import Link from 'next/link';

const MealCart = () => {
	const { state } = useContext(UserContext);
	return (
		<Paper
			sx={{
				position: 'absolute',
				top: '90%',
				right: '4%',
				zIndex: 99,
				width: '450px',
				height: '450px',
				overflowY: 'auto',
				p: '20px',
			}}>
			<CartItemList />
			<Box
				sx={{ borderTop: '1px solid orange', mt: '15px', pt: '20px' }}
				display={'flex'}
				width='100%'>
				<Box
					display={'flex'}
					width='100%'
					alignItems='center'
					justifyContent='space-between'>
					<Link href={'/checkout'}>
						<Button variant='contained' color='error'>
							Checkout
						</Button>
					</Link>
					<Typography textAlign={'end'}>
						Total: ${Math.round(state.cartTotalPrice * 100) / 100}
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default MealCart;
