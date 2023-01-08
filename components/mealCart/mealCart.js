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
				width: '25%',
				height: '300px',
				overflowY: 'auto',
			}}>
			<CartItemList />
		</Paper>
	);
};

export default MealCart;
