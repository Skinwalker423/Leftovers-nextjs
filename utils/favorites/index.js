export async function addFavoritePrepperToDb(email) {
	console.log(email);

	try {
		const response = await fetch('/api/favorites/addPrepper', {
			method: 'PATCH',
			headers: {
				'Application-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error('something went wrong adding prepper', err);
	}
}
export async function removeFavoritePrepperToDb() {}
