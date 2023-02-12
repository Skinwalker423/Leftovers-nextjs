import { MongoClient } from 'mongodb';

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

	const mappedDoc = document.map(({ _id, firstName, lastName, email }) => {
		return {
			name: `${firstName} ${lastName}`,
			email: email,
			id: _id.toString(),
		};
	});
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
			console.log('no user found with email');
			return null;
		}

		const formattedDoc = {
			id: document?._id.toString(),
			email: document?.email,
			favorites: document?.favorites,
			password: document?.password,
		};
		console.log(`user email found: ${document.email}:`);
		client.close();
		return formattedDoc;
	} catch (err) {
		client.close();
		console.error('problem retrieving favorites list from user', err);
	}
}
