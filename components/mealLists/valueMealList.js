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

	let newList = [];
	state.localPreppers.forEach((prepper) => {
		if (!prepper.meals) return;
		prepper.meals.forEach((meal) => {
			if (meal.qty > 0 && meal.price === 5) {
				newList.push({
					...meal,
					prepperEmail: prepper.email,
					isKitchenClosed: prepper.isKitchenClosed,
					kitchenTitle: prepper.kitchenTitle,
					prepperId: prepper.id
				});
			}
		});
	});

	const list = slicedValueMeals.map(
		({
			id,
			title,
			price,
			qty,
			description,
			image,
			prepperEmail,
			kitchenTitle,
			isKitchenClosed,
			prepperId
		}) => {
			if (price === 5 && qty > 0) {
				return (
					<FoodItemCard
						key={id}
						prepperEmail={prepperEmail}
						kitchen={kitchenTitle}
						prepperId={prepperId}
						foodItem={title}
						id={id}
						price={price}
						qty={qty}
						description={description}
						image={image}
						setMsg={setMsg}
						isKitchenClosed={isKitchenClosed}
						showClosed={true}
					/>
				);
			}
		}
	);

	return (
		<Box display={'flex'} flexDirection={'column'}>
			<CategoryPaginationHeader
				title="$5 Meals"
				color={colors.greenAccent[700]}
				setSlicedList={setSlicedValueMeals}
				list={newList}
				meals={true}
				resultsPerPage={3}
			/>
			<Box
				sx={{ overflowX: { xs: 'hidden' }, overflowY: 'hidden' }}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				flexWrap={{ xs: 'unset', sm: 'wrap', md: 'unset' }}
			>
				{list.length > 0 && list}
			</Box>
		</Box>
	);
};

export default ValueMealList;
