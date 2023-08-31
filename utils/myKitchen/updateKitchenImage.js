export async function updateKitchenImageDb(email, kitchenImgUrl) {
	const formBody = {
		kitchenImgUrl,
		email
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
