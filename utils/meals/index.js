export async function addMeal(email, meal) {
	const formBody = {
		meal,
		email
	};

	const response = await fetch('/api/meals/addMeal', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}

export async function removeMeal(email, mealId) {
	const formBody = {
		mealId,
		email
	};

	const response = await fetch('/api/meals/removeMeal', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}

export async function updateMealQtyInDb(email, mealId, qty) {
	const formBody = {
		mealId,
		email,
		qty
	};

	const response = await fetch('/api/meals/updateQty', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}

export async function updateMealImgInDb(email, mealId, imgUrl, type) {
	const formBody = {
		imgUrl,
		email,
		mealId,
		type
	};

	const response = await fetch('/api/meals/updateImgUrl', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}

export async function decrementMealQtyDB(email, mealId, qty) {
	const formBody = {
		mealId,
		email,
		qty
	};

	const response = await fetch('/api/checkout/processPayment', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}
