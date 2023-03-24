export async function updateKitchenTitleDb(email, kitchenTitle) {
	const formBody = {
		kitchenTitle,
		email,
	};

	const response = await fetch('/api/myKitchen/updateTitle', {
		headers: {
			'Content-type': 'application/json',
		},
		method: 'PATCH',
		body: JSON.stringify(formBody),
	});
	const data = await response.json();
	return data;
}
