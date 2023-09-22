import User from '../../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../../db/mongodb/mongoose';

async function updateUserDefaultZipcode(req, res) {
	if (req.method !== 'PATCH') {
		return res.status(400).json({ error: 'invalid request' });
	}

	const { id } = req.query;
	const newZipcode = req.body;
	console.log('inside zip api', id);
	console.log('new zip', newZipcode);

	try {
		res.status(200).json({ message: 'update complete' });
	} catch (error) {
		res.status(500).json({ error: 'problem updating existing user' });
	}
}

export default updateUserDefaultZipcode;
