export async function registerPrepper(formBody) {
	const response = await fetch('/api/register/prepper', {
		headers: {
			'Content-type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(formBody),
	});
	const data = await response.json();
	return data;
}

export async function registerUser(userformBody) {
	const response = await fetch('/api/register/user', {
		headers: {
			'Content-type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(userformBody),
	});
	const data = await response.json();
	return data;
}
