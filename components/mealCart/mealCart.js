import { Paper } from '@mui/material';

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
			}}>
			Food items
		</Paper>
	);
};

export default MealCart;
