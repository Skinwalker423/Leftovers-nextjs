import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';
import { updateKitchenOpenStatusDb } from '../../../db/mongodb/mongoDbUtils';

const updateKitchenOpenStatus = async (req, res) => {
	if (req.method !== 'PATCH') {
		return res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	const { status, email } = body;

	try {
		const client = await connectMongoDb();
		const document = await updateKitchenOpenStatusDb(client, email, status);

		if (!document || !document.modifiedCount) {
			res.status(500).json({ error: 'could not update kitchen open status' });
			return;
		}
		res
			.status(200)
			.json({ message: 'Successfully updated kitchen open status' });
		return;
	} catch (err) {
		res.status(500).json({ error: 'problem updating kitchen status', err });
	}
};

export default updateKitchenOpenStatus;
