export const fetchLocalPreppers = async (zipCode) => {
	const prepperData = await fetch(
		'http://localhost:3000/api/getLocalPreppers',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ zipCode }),
		}
	);

	return prepperData.json();
};
