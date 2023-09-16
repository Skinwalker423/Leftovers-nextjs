export default async function fetchFavoritePreppers() {
	try {
		const response = await fetch('/api/getFavoritePreppers');
		const data = await response.json();
		return data;
	} catch (err) {
		console.error('problem fetching favorite list', err);
	}
}
