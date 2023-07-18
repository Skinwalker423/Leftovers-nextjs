export async function updateDescriptionDb(email, description) {
	const formBody = {
		description,
		email,
	};

	const response = await fetch('/api/myKitchen/updateDescription', {
		headers: {
			'Content-type': 'application/json',
		},
		method: 'PATCH',
		body: JSON.stringify(formBody),
	});
	const data = await response.json();
	return data;
}
