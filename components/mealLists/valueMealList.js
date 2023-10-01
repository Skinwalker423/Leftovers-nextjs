import React, { useContext, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import FoodItemCard from '../Card/foodItemCard';
import Box from '@mui/material/Box';
import CategoryPaginationHeader from '../category/categoryPaginationHeader';
import { useColors } from '../../hooks/useColors';

const ValueMealList = ({ userEmail, setMsg }) => {
	const { state } = useContext(UserContext);
	const { colors } = useColors();

	const [slicedValueMeals, setSlicedValueMeals] = useState([]);

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
		<Box display={'flex'} flexDirection={'column'}>
			<CategoryPaginationHeader
				title="$5 Meals"
				color={colors.greenAccent[700]}
				setSlicedList={setSlicedValueMeals}
				list={list}
				meals={true}
				resultsPerPage={2}
			/>
			<Box
				sx={{ overflowX: { xs: 'hidden' }, overflowY: 'hidden' }}
				display={'flex'}
				flexDirection={{ xs: 'column', md: 'row' }}
				flexWrap={{ xs: 'none', md: 'wrap' }}
				justifyContent={'center'}
				alignItems={'center'}
			>
				{slicedValueMeals.length > 0 && slicedValueMeals}
			</Box>
		</Box>
	);
};

export default ValueMealList;
