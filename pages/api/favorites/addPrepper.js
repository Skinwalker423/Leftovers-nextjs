import React from 'react';
import { addPrepperToFavoritesListDb } from '../../../db/mongodb/mongoDbUtils';
import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';

const addPrepper = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = JSON.parse(req.body);

	try {
		const client = await connectMongoDb();
		const document = await addPrepperToFavoritesListDb(
			client,
			body.prepper,
			body.userEmail
		);

		if (!document) {
			client.close();
			res.status(500).json({ error: 'could not confirm adding favorite' });
			return;
		}
		client.close();
		res
			.status(200)
			.json({ message: 'Successfully added prepper to favorites' });
		return;
	} catch (err) {
		client.close();
		res.status(500).json({ error: 'problem adding to favorites list', err });
	}
};

export default addPrepper;
