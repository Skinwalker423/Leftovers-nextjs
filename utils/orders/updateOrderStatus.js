export const updateOrderStatusPost = async (orderId, status, prepperEmail) => {
	const response = await fetch(
		'http://localhost:3000/api/orders/updateStatus',
		{
			headers: {
				'Content-type': 'Application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				orderId,
				status,
				prepperEmail
			})
		}
	);

	const data = await response.json();
	return data;
};
