import {
	connectMongoDb,
	decrementMealQty
} from '../../../db/mongodb/mongoDbUtils';

const processPayment = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;

	const { mealId, email, qty } = body;

	if (!mealId || !email) {
		return res.status(400).json({ error: 'no mealId and/or prepper email' });
	}

	try {
		const client = await connectMongoDb();
		const document = await decrementMealQty(client, email, mealId, qty);

		if (!document || !document.modifiedCount) {
			client.close();
			res.status(500).json({ error: 'could not update meal Qty' });
			return;
		}
		client.close();
		res.status(200).json({ message: 'Successfully updated meal Qty' });
		return;
	} catch (err) {
		res.status(500).json({ error: 'problem updating meal qty in db', err });
	}
};

export default processPayment;
