import { Paper, Box, Button, Typography } from '@mui/material';
import CartItemList from './cartItemList';
import { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import Link from 'next/link';
import { useColors } from '../../hooks/useColors';

const MealCart = ({ setShowMealCart }) => {
	const { state } = useContext(UserContext);
	const { colors } = useColors();

	function handleCheckoutBtn() {
		setShowMealCart(false);
	}

	const totalPrice = Math.round(state.cartTotalPrice * 100) / 100;

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
				p: '20px'
			}}
		>
			<CartItemList />
			<Box
				sx={{
					borderTop: `1px solid ${colors.orangeAccent[900]}`,
					mt: '15px',
					pt: '20px'
				}}
				display={'flex'}
				width="100%"
			>
				<Box
					display={'flex'}
					width="100%"
					alignItems="center"
					justifyContent="space-between"
				>
					<Link href={'/checkout'}>
						<Button
							onClick={handleCheckoutBtn}
							variant="contained"
							color="error"
						>
							Checkout
						</Button>
					</Link>
					<Typography textAlign={'end'}>Total: ${totalPrice};</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default MealCart;
