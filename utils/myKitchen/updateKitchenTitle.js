export async function updateKitchenTitleDb(email, kicthenTitle) {
	const formBody = {
		kicthenTitle,
		email,
	};

	const response = await fetch('/api/meals/updateQty', {
		headers: {
			'Content-type': 'application/json',
		},
		method: 'PATCH',
		body: JSON.stringify(formBody),
	});
	const data = await response.json();
	return data;
}
