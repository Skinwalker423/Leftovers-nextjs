import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';
import { updatedescription } from '../../../db/mongodb/mongoDbUtils';

const updateDescription = async (req, res) => {
	if (req.method !== 'PATCH') {
		return res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { description, email } = body;

	if (!description || description.trim() === '') {
		return res.status(400).json({ error: 'no description entered' });
	}

	if (description.length > 240) {
		return res
			.status(400)
			.json({ error: 'The description is too long. 240 max characters' });
	}

	if (!email) {
		return res.status(400).json({ error: 'could not verify email address' });
	}

	try {
		const client = await connectMongoDb();
		const document = await updatedescription(client, email, description);

		if (!document || !document.modifiedCount) {
			client.close();
			res.status(500).json({ error: 'could not update kitchen description' });
			return;
		}
		client.close();
		res
			.status(200)
			.json({ message: 'Successfully updated kitchen description' });
		return;
	} catch (err) {
		console.log('error:', err);
		res.status(500).json({ error: 'problem updating description in db', err });
	}
};

export default updateDescription;
