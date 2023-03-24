import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';
import { updateKitchenTitle } from '../../../db/mongodb/mongoDbUtils';

const updateTitle = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { kitchenTitle, email } = body;

	if (!kitchenTitle || kitchenTitle.trim() === '') {
		res.status(400).json({ error: 'no title entered' });
	}

	if (!email) {
		res.status(400).json({ error: 'could not verify email address' });
	}

	try {
		const client = await connectMongoDb();
		const document = await updateKitchenTitle(client, email, kitchenTitle);

		if (!document || !document.modifiedCount) {
			client.close();
			res.status(500).json({ error: 'could not update kitchen title' });
			return;
		}
		client.close();
		res.status(200).json({ message: 'Successfully updated kitchen title' });
		return;
	} catch (err) {
		console.log('error:', err);
		res.status(500).json({ error: 'problem updating title in db', err });
	}
};

export default updateTitle;
