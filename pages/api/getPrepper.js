import React from 'react';
import { mockDataContacts } from '../../db/mockData';

async function getPrepper(req, res) {
	if (req.method === 'POST') {
		console.log('this is the request body: ', req.body);
		const pid = req.body.pid;
		if (!pid) {
			return res.status(500).send({ error: 'no prepper id found' });
		}
		const findPrepper = mockDataContacts.find((prepper) => pid == prepper.id);
		if (findPrepper) {
			res.status(200).json(findPrepper);
		} else {
			res.status(500).json({ data: 'no prepper found' });
		}
	} else {
		res.status(400).send({ error: 'Not an authorized POST request' });
	}
}

export default getPrepper;
