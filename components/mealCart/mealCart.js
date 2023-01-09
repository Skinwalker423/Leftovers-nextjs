import { Paper } from '@mui/material';
import CartItemList from './cartItemList';

const MealCart = () => {
	return (
		<Paper
			sx={{
				position: 'absolute',
				top: '90%',
				right: '4%',
				zIndex: 99,
				width: '450px',
				height: '400px',
				overflowY: 'auto',
				p: '20px',
			}}>
			<CartItemList />
		</Paper>
	);
};

export default MealCart;
