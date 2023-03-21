import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';
import { updateMealQty } from '../../../db/mongodb/mongoDbUtils';

const updateQty = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { mealId, email, qty } = body;
	console.log('mealid and email and qty', mealId, email, qty);

	try {
		const client = await connectMongoDb();
		const document = await updateMealQty(client, email, mealId, qty);
		console.log('this is the response to update meal qty in mongo:', document);

		if (!document || !document.modifiedCount) {
			client.close();
			res.status(500).json({ error: 'could not update meal Qty' });
			return;
		}
		client.close();
		res.status(200).json({ message: 'Successfully updated meal Qty' });
		return;
	} catch (err) {
		console.log('error:', err);
		res.status(500).json({ error: 'problem updating meal qty in db', err });
	}
};

export default updateQty;
