import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import FoodItemCard from '../Card/foodItemCard';
import Box from '@mui/material/Box';

const ValueMealList = ({ userEmail, setMsg }) => {
	const { state } = useContext(UserContext);

	const list = state.localPreppers.map((prepper) => {
		if (!prepper.meals) return;
		return prepper.meals.map(
			({ id, title, price, qty, description, image }) => {
				if (price === 5 && qty > 0 && prepper.email !== userEmail) {
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
							image={image}
							setMsg={setMsg}
							isKitchenClosed={prepper.isKitchenClosed}
							showClosed={true}
						/>
					);
				}
			}
		);
	});

	return (
		<Box
			sx={{ overflowX: { xs: 'hidden' }, overflowY: 'hidden' }}
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			flexWrap={{ xs: 'none', md: 'wrap' }}
			justifyContent={'center'}
			alignItems={'center'}
		>
			{list.length > 0 && list}
		</Box>
	);
};

export default ValueMealList;
