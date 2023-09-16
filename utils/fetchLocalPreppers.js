export const fetchLocalPreppers = async (zipCode) => {
	const prepperData = await fetch('/api/getLocalPreppers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ zipCode })
	});

	return await prepperData.json();
};
