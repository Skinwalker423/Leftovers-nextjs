export async function addMeal(email, meal) {
	const formBody = {
		meal,
		email,
	};

	const response = await fetch('/api/meals/addMeal', {
		headers: {
			'Content-type': 'application/json',
		},
		method: 'PATCH',
		body: JSON.stringify(formBody),
	});
	const data = await response.json();
	return data;
}

export async function removeMeal(email, mealId) {
	const formBody = {
		mealId,
		email,
	};

	const response = await fetch('/api/meals/removeMeal', {
		headers: {
			'Content-type': 'application/json',
		},
		method: 'PATCH',
		body: JSON.stringify(formBody),
	});
	const data = await response.json();
	return data;
}
