import React from 'react';
import { mockDataContacts } from '../../data/mockData';

async function getLocalPreppers(req, res) {
	if (req.method === 'POST') {
		console.log('this is the request body: ', req.body);
		const zip = req.body.zipCode;
		if (!zip) {
			return res.status(500).send({ error: 'no prepper id found' });
		}
		const findPreppers = mockDataContacts.filter(
			(prepper) => zip == prepper.zipCode
		);
		if (findPreppers) {
			res.status(200).json(findPreppers);
		} else {
			res.status(500).json({ data: 'no preppers found' });
		}
	} else {
		res.status(400).send({ error: 'Not an authorized POST request' });
	}
}

export default getLocalPreppers;
