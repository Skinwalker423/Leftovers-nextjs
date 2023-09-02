export async function updateKitchenImageDb(email, kitchenImgUrl, type) {
	const formBody = {
		kitchenImgUrl,
		email,
		type
	};

	const response = await fetch('/api/myKitchen/updateKitchenImage', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}
