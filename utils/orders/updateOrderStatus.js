export const updateOrderStatusPost = async (orderId, status, prepperEmail) => {
	const response = await fetch('/api/orders/updateStatus', {
		headers: {
			'Content-type': 'Application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			orderId,
			status,
			prepperEmail
		})
	});

	const data = await response.json();
	return data;
};
