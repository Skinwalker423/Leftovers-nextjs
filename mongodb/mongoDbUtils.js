import { MongoClient, ObjectId } from 'mongodb';
const ObjectID = require('mongodb').ObjectId;

export async function connectMongoDb() {
	const uri = `mongodb+srv://skinwalker423:${process.env.MONGO_DB_KEY}@cluster23.nlaxbsz.mongodb.net/leftovers?retryWrites=true&w=majority`;
	const client = await MongoClient.connect(uri);
	console.log('client connected');
	return client;
}
export async function addDocToDb(client, collectionArg, doc) {
	const collection = client.db('leftovers').collection(collectionArg);
	const document = await collection.insertOne(doc);
	console.log(`document for collection ${collectionArg} added`, document);
	return document;
}
export async function addPrepperToFavoritesListDb(client, prepper, userEmail) {
	try {
		const collection = client.db('leftovers').collection('users');
		const document = await collection.updateOne(
			{ email: userEmail },
			{
				$push: { favorites: prepper },
			}
		);

		if (!document) {
			return;
		}
		console.log(`document added to favorites`, document);
		return document;
	} catch (err) {
		console.error('problem updating document', err);
		return;
	}
}
export async function removePrepperFromFavoritesListDb(
	client,
	prepperId,
	userEmail
) {
	try {
		const collection = client.db('leftovers').collection('users');
		const document = await collection.updateOne(
			{ email: userEmail },
			{
				$pull: { favorites: { id: prepperId } },
			}
		);

		if (!document) {
			return;
		}
		console.log(`document added to favorites`, document);
		return document;
	} catch (err) {
		console.error('problem updating document', err);
		return;
	}
}
export async function findAllInCollection(client, collectionArg) {
	const collection = client.db('leftovers').collection(collectionArg);
	const document = await collection.find({}).toArray();

	console.log(`document found for collection ${collectionArg}:`);
	if (!document) {
		return [];
	}

	const mappedDoc = document.map(
		({ _id, firstName, lastName, email, description, kitchenTitle }) => {
			return {
				name: `${firstName} ${lastName}`,
				email: email,
				id: _id.toString(),
				description: description,
				kitchenTitle: kitchenTitle,
			};
		}
	);
	console.log(mappedDoc);
	return mappedDoc;
}
export async function findExistingPrepperEmail(client, email) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.findOne({ email });
		if (!document) {
			client.close();
			return null;
		}
		console.log(`prepper email found: ${document}:`);
		const formattedDoc = {
			id: document?._id.toString(),
			email: document.email,
			location: {
				address: document.location.address,
				city: document.location.city,
				state: document.location.state,
				zipcode: document.location.zipcode,
			},
			meals: document.meals,
			description: document?.description,
			kitchenTitle: document?.kitchenTitle,
			name: `${document.firstName} ${document.lastName}`,
		};
		client.close();
		return formattedDoc;
	} catch (err) {
		client.close();
		console.error('problem retrieving user from db', err);
	}
}
export async function findExistingUserEmail(client, email) {
	try {
		const collection = client.db('leftovers').collection('users');
		const document = await collection.findOne({ email });

		if (!document) {
			client.close();
			return null;
		}

		const formattedDoc = {
			id: document?._id.toString(),
			email: document?.email,
			favorites: document?.favorites,
			password: document?.password,
			meals: document?.meals,
			description: document?.description,
			kitchenTitle: document?.kitchenTitle,
			name: `${document.firstName} ${document.lastName}`,
		};
		client.close();
		return formattedDoc;
	} catch (err) {
		client.close();
		console.error('problem retrieving favorites list from user', err);
	}
}

export async function findExistingPrepperWithId(client, id) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.findOne({ _id: ObjectID(id) });
		if (!document) {
			client.close();
			return null;
		}
		console.log(`prepper email found with ID: ${document}:`);
		const formattedDoc = {
			id: document?._id.toString(),
			email: document.email,
			location: {
				address: document.location.address,
				city: document.location.city,
				state: document.location.state,
				zipcode: document.location.zipcode,
			},
			meals: document.meals,
			description: document?.description,
			kitchenTitle: document?.kitchenTitle,
			name: `${document.firstName} ${document.lastName}`,
		};
		client.close();
		return formattedDoc;
	} catch (err) {
		client.close();
		console.error('problem retrieving user from db', err);
	}
}

export async function addMealToPrepperDb(client, email, meal) {
	const mealDetails = {
		id: ObjectId().toString(),
		...meal,
	};
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{ email: email },
			{
				$push: { meals: mealDetails },
			}
		);

		if (!document) {
			return;
		}
		console.log(`document added to meals`, mealDetails);
		return mealDetails;
	} catch (err) {
		console.error('problem updating meals', err);
		return;
	}
}

export async function removeMealFromPrepperListDb(client, userEmail, mealId) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{ email: userEmail },
			{
				$pull: { meals: { id: mealId } },
			}
		);

		if (!document) {
			return;
		}
		console.log(`meal removed`, document);
		return document;
	} catch (err) {
		console.error('problem updating document', err);
		return;
	}
}

export async function findLocalPreppersWithZipcode(client, zipcode) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const data = await collection
			.find({ 'location.zipcode': zipcode.toString() })
			.toArray();
		if (!data) {
			client.close();
			console.log('no data found with zipcode query');
			return [];
		}
		const mappedDoc = data.map(
			({ _id, firstName, lastName, email, description, kitchenTitle }) => {
				return {
					name: `${firstName} ${lastName}`,
					email: email,
					id: _id.toString(),
					description: description,
					kitchenTitle: kitchenTitle,
				};
			}
		);
		client.close();
		return mappedDoc;
	} catch (err) {
		client.close();
		console.error('problem retrieving preppers from db', err);
	}
}

export async function updateMealQty(client, userEmail, mealId, qty) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail,
				'meals.id': mealId,
			},
			{ $set: { 'meals.$.qty': qty } }
		);

		if (!document) {
			return;
		}
		return document;
	} catch (err) {
		console.error('problem updating qty', err);
		return;
	}
}

export async function updateKitchenTitle(client, userEmail, kitchenTitle) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail,
			},
			{ $set: { kitchenTitle } }
		);

		if (!document) {
			return;
		}
		console.log('updated kitchen name', document);
		return document;
	} catch (err) {
		console.error('problem updating kitchen name', err);
		return;
	}
}