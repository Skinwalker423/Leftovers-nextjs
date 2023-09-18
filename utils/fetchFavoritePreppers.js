export default async function fetchFavoritePreppers() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/getFavoritePreppers`
		);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error('problem fetching favorite list', err);
	}
}
