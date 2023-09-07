import {
	addImgUrlToSavedImages,
	connectMongoDb,
	findExistingPrepperEmail
} from '../../../db/mongodb/mongoDbUtils';
import { addMealToPrepperDb } from '../../../db/mongodb/mongoDbUtils';

const addMeal = async (req, res) => {
	if (req.method !== 'PATCH') {
		res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { meal, email } = body;
	const currentDate = new Date();

	const mealDetails = {
		title: meal.title,
		price: parseInt(meal.price),
		description: meal.description,
		image: meal.image,
		qty: parseInt(meal.qty),
		createdAt: currentDate,
		last_modified: currentDate
	};

	const client = await connectMongoDb();
	try {
		const document = await addMealToPrepperDb(client, email, mealDetails);
		console.log('this is the response for adding a meal in mongo:', document);
		const prepper = await findExistingPrepperEmail(client, email);

		console.log('saved meal images', prepper.savedMealImages);
		if (!prepper.savedMealImages.includes(meal.image)) {
			await addImgUrlToSavedImages(client, email, meal.image);
		}

		if (!document) {
			client.close();
			res.status(500).json({ error: 'could not confirm adding meal' });
			return;
		}
		client.close();
		res
			.status(200)
			.json({ message: 'Successfully added a meal', meal: document });
		return;
	} catch (err) {
		client.close();
		res.status(500).json({ error: 'problem updating meals in db', err });
	}
};

export default addMeal;
