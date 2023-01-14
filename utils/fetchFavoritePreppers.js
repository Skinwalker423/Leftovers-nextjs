export default async function fetchFavoritePreppers() {
	try {
		const response = await fetch(
			'http://localhost:3000/api/getFavoritePreppers'
		);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error('problem fetching favorite list', err);
	}
}
