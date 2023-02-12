import React from 'react';
import { removePrepperFromFavoritesListDb } from '../../../db/mongodb/mongoDbUtils';
import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';

const removePrepper = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = JSON.parse(req.body);
	console.log('body', body.userEmail);
	console.log('This is the prepperDetails:');

	//find prepper using email, then pass prepper to the db
	try {
		const client = await connectMongoDb();
		const document = await removePrepperFromFavoritesListDb(
			client,
			body.prepperId,
			body.userEmail
		);
		console.log(
			'this is the response for removing a prepper from the favorites list in mongo:',
			document
		);

		if (!document) {
			client.close();
			res
				.status(500)
				.json({ error: 'could not confirm removing prepper in favorites' });
			return;
		}
		client.close();
		res
			.status(200)
			.json({ message: 'Successfully removed prepper from favorites' });
		return;
	} catch (err) {
		client.close();
		res
			.status(500)
			.json({ error: 'problem removing prepper from favorites list', err });
	}
};

export default removePrepper;
