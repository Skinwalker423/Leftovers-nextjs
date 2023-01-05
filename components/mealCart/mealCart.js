import { Paper } from '@mui/material';
import CaritItem from './caritItem';

const MealCart = () => {
	return (
		<Paper
			sx={{
				position: 'absolute',
				top: '90%',
				right: '4%',
				zIndex: 99,
				width: '300px',
				height: '300px',
				overflowY: 'auto',
			}}>
			<CaritItem price='4.99' item='Burrito' img='/vercel.svg' />
			<CaritItem price='4.99' item='Burrito' />
			<CaritItem price='4.99' item='Burrito' />
			<CaritItem price='4.99' item='Burrito' />
			<CaritItem price='4.99' item='Burrito' />
			<CaritItem price='4.99' item='Burrito' />
		</Paper>
	);
};

export default MealCart;
