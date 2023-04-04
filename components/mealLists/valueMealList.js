import React, { useState, useEffect, use } from 'react';
import FoodItemCard from '../Card/foodItemCard';
import Box from '@mui/material/Box';
import { RouterTwoTone } from '@mui/icons-material';

const ValueMealList = ({ localPreppers, setMessage, row }) => {
	console.log(localPreppers);
	const [valueList, setValueList] = useState([]);

	if (!localPreppers.length) {
		return 'loading...';
	}

	const list = localPreppers.map((prepper) => {
		return prepper.meals.map(({ id, title, price, qty, description }) => {
			if (price === 5 && qty > 0) {
				return (
					<FoodItemCard
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

	console.log(list);

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
