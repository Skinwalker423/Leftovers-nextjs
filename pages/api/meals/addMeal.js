import { connectMongoDb } from '../../../db/mongodb/mongoDbUtils';
import { addMealToPrepperDb } from '../../../db/mongodb/mongoDbUtils';

const addMeal = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { meal, email } = body;

	try {
		const client = await connectMongoDb();
		const document = await addMealToPrepperDb(client, email, meal);
		console.log('this is the response for adding a meal in mongo:', document);

		if (!document) {
			client.close();
			res.status(500).json({ error: 'could not confirm adding meal' });
			return;
		}
		client.close();
		res.status(200).json({ message: 'Successfully added a meal' });
		return;
	} catch (err) {
		client.close();
		res.status(500).json({ error: 'problem updating meals in db', err });
	}
};

export default addMeal;
