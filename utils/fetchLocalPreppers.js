export const fetchLocalPreppers = async (zipCode) => {
	const prepperData = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/getLocalPreppers`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ zipCode })
		}
	);

	return await prepperData.json();
};
