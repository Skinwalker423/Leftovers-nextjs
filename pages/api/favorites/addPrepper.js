import React from 'react';

const addPrepper = (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const prepper = JSON.parse(req.body);
	console.log('This is the prepperId: ', prepper.email);

	//find prepper using email, then pass prepper to the db

	res.status(200).json({ message: 'Successfully added prepper to favorites' });
};

export default addPrepper;
