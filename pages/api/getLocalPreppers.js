import React from 'react';
import { mockDataContacts } from '../../db/mockData';
import {
	findLocalPreppersWithZipcode,
	connectMongoDb
} from '../../db/mongodb/mongoDbUtils';

async function getLocalPreppers(req, res) {
	if (req.method === 'POST') {
		console.log('this is the request body: ', req.body);
		const zip = req.body.zipCode;
		if (!zip) {
			return res.status(500).send({ error: 'no zipcode entered' });
		}

		try {
			const client = await connectMongoDb();
			const findPreppers = await findLocalPreppersWithZipcode(client, zip);

			if (findPreppers.length !== 0) {
				res.status(200).json(findPreppers);
			} else {
				res
					.status(500)
					.json({ error: 'no preppers found. Try another zipcode' });
			}
		} catch (err) {
			res.status(500).json({ error: 'problem with mongo', err });
		}
	} else {
		res.status(400).send({ error: 'Not an authorized POST request' });
	}
}

export default getLocalPreppers;
