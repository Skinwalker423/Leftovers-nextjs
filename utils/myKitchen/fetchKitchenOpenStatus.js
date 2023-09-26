export async function fetchKitchenOpenStatusDb(email, status) {
	const formBody = {
		status,
		email
	};

	const response = await fetch('/api/myKitchen/updateKitchenOpenStatus', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}
