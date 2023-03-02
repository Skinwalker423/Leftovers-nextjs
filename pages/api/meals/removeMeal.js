import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';
import { removeMealFromPrepperListDb } from '../../../db/mongodb/mongoDbUtils';

const addMeal = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { mealId, email } = body;
	console.log('mealid and email', mealId, email);

	try {
		const client = await connectMongoDb();
		const document = await removeMealFromPrepperListDb(client, email, mealId);
		console.log('this is the response to remove a meal in mongo:', document);

		if (!document.modifiedCount) {
			client.close();
			res.status(500).json({ error: 'could not remove meal' });
			return;
		}
		client.close();
		res.status(200).json({ message: 'Successfully removed a meal' });
		return;
	} catch (err) {
		client.close();
		res.status(500).json({ error: 'problem updating meals in db', err });
	}
};

export default addMeal;
