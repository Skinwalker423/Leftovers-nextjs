import React, { useContext } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CartItemList from '../../mealCart/cartItemList';
import { useColors } from '../../../hooks/useColors';
import { UserContext } from '../../../store/UserContext';

export default function MealCartDrawer({ isDrawerOpen, toggleDrawer }) {
	const { state } = useContext(UserContext);
	const { colors } = useColors();

	return (
		<Drawer
			anchor={'right'}
			variant='temporary'
			open={isDrawerOpen}
			onClose={toggleDrawer}>
			<CartItemList />

			<Box
				sx={{
					borderTop: `1px solid ${colors.orangeAccent[900]}`,
					mt: '15px',
					pt: '20px',
				}}
				display={'flex'}
				width='100%'>
				<Box
					display={'flex'}
					width='100%'
					alignItems='center'
					justifyContent='space-evenly'>
					<Link href={'/checkout'}>
						<Button onClick={toggleDrawer} variant='contained' color='error'>
							Checkout
						</Button>
					</Link>
					<Typography variant='h3' textAlign={'end'}>
						Total: ${Math.round(state.cartTotalPrice * 100) / 100}
					</Typography>
				</Box>
			</Box>
		</Drawer>
	);
}
