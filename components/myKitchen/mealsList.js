import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MyKitchenMealCard from '../Card/myKitchenMeals';
import Box from '@mui/material/Box';

function MealsList({ meals, prepperEmail, setMeals, setMsg, setError }) {
	console.log(meals);
	const mealsList = meals.map(({ title, id, description, qty }) => {
		return (
			<Box key={id} mb='2em'>
				<MyKitchenMealCard
					key={id}
					qty={qty}
					foodItem={title}
					description={description}
					setMsg={setMsg}
					setError={setError}
					prepperEmail={prepperEmail}
					id={id}
					setMeals={setMeals}
				/>
			</Box>
		);
	});

	return (
		<AnimatePresence>
			<motion.div
				key={'meals'}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ type: 'spring', delay: 0.2 }}
				exit={{ opacity: 0 }}>
				<Box
					width={'100%'}
					mt={'2em'}
					gap='2em'
					display={'flex'}
					alignItems='center'
					justifyContent={'space-evenly'}
					flexWrap='wrap'>
					{mealsList}
				</Box>
			</motion.div>
		</AnimatePresence>
	);
}

export default MealsList;
