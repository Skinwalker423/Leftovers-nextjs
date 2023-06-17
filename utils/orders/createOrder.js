export const createOrder = async (order) => {
	const response = await fetch('/api/checkout/createOrder', {
		headers: {
			'Content-type': 'Application/json'
		},
		method: 'POST',
		body: JSON.stringify(order)
	});

	const data = await response.json();
	return data;
};
