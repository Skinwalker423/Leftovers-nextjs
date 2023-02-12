export async function addFavoritePrepperToDb(prepper, userEmail) {
	const favBody = {
		prepper: prepper,
		userEmail: userEmail,
	};
	try {
		const response = await fetch('/api/favorites/addPrepper', {
			method: 'PATCH',
			headers: {
				'Application-Type': 'application/json',
			},
			body: JSON.stringify(favBody),
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error('something went wrong adding prepper', err);
	}
}
export async function removeFavoritePrepperToDb(prepperId, userEmail) {
	const favBody = {
		prepperId: prepperId,
		userEmail: userEmail,
	};
	try {
		const response = await fetch('/api/favorites/removePrepper', {
			method: 'PATCH',
			headers: {
				'Application-Type': 'application/json',
			},
			body: JSON.stringify(favBody),
		});
		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error('something went wrong removing prepper', err);
	}
}
