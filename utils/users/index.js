export const fetchUpdateUserZipcode = async (userId, newZipcode) => {
	const prepperData = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: newZipcode
		}
	);

	return await prepperData.json();
};
