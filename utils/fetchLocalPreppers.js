export const fetchLocalPreppers = async ({ zipCode, prepperEmail }) => {
	const prepperData = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/getLocalPreppers`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ zipCode, prepperEmail })
		}
	);

	return await prepperData.json();
};
