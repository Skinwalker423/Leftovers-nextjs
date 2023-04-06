import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import FoodItemCard from '../Card/foodItemCard';
import Box from '@mui/material/Box';

const ValueMealList = () => {
	const { state } = useContext(UserContext);

	const list = state.localPreppers.map((prepper) => {
		return prepper.meals.map(({ id, title, price, qty, description }) => {
			if (price === 5 && qty > 0) {
				return (
					<FoodItemCard
						key={id}
						prepperEmail={prepper.email}
						kitchen={prepper.kitchenTitle}
						prepperId={prepper.id}
						foodItem={title}
						id={id}
						price={price}
						qty={qty}
						description={description}
					/>
				);
			}
		});
	});

	return (
		<Box
			sx={{ overflowX: { xs: 'hidden' }, overflowY: 'hidden' }}
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			flexWrap={{ xs: 'none', md: 'wrap' }}>
			{list}
		</Box>
	);
};

export default ValueMealList;
