import React, { useState, useEffect } from 'react';
import FoodItemCard from '../Card/foodItemCard';

const ValueMealList = ({ localPreppers, setMessage }) => {
	console.log(localPreppers);
	const [valueList, setValueList] = useState([]);

	// for (let prepper in localPreppers) {
	// 	if (prepper.meals) {
	// 		const filteredList = prepper.meals.filter((meal) => meal.price === 5);
	// 		setValueList([...valueList, ...filteredList]);
	// 	}
	// }

	// console.log(valueList);

	return <div>list</div>;
};

export default ValueMealList;
