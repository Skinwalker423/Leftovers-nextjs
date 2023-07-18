export const fetchPrepper = async (pid) => {
	const prepperData = await fetch('http://localhost:3000/api/getPrepper', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ pid })
	});

	return await prepperData.json();
};
