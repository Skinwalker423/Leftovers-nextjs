export async function updateProfileImageDb(email, profileImgUrl, type) {
	const formBody = {
		profileImgUrl,
		email,
		type
	};

	const response = await fetch('/api/myKitchen/updateProfileImage', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
}
