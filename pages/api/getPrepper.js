import React from 'react';
import { mockDataContacts } from '../../db/mockData';
import {
	findExistingPrepperWithId,
	connectMongoDb,
} from '../../db/mongodb/mongoDbUtils';

async function getPrepper(req, res) {
	if (req.method === 'POST') {
		console.log('this is the request body: ', req.body);
		const pid = req.body.pid;
		if (!pid) {
			return res.status(500).send({ error: 'no prepper id found' });
		}
		try {
			const client = await connectMongoDb();
			const document = await findExistingPrepperWithId(client, pid);
			// const findPrepper = mockDataContacts.find((prepper) => pid == prepper.id);
			if (document) {
				res.status(200).json(document);
			} else {
				res.status(500).json({ error: 'no prepper found' });
			}
		} catch (err) {
			res.status(500).json({ error: 'problem finding existing prepper' });
		}
	} else {
		res.status(400).send({ error: 'Not an authorized POST request' });
	}
}

export default getPrepper;
