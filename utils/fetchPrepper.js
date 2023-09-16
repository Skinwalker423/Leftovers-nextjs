export const fetchPrepper = async (pid) => {
	const prepperData = await fetch('/api/getPrepper', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ pid })
	});

	return await prepperData.json();
};
