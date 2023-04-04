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
			display={'flex'}
			flexWrap={{ xs: 'unset', md: 'wrap' }}
			width={'100%'}
			gap='3em'
			mb={'1em'}
			sx={{
				height: {
					xs: row ? '' : '30rem',
					sm: row ? '' : '30rem',
					md: '',
					lg: '',
				},
				overflowY: 'auto',
			}}>
			{list}
		</Box>
	);
};

export default ValueMealList;
