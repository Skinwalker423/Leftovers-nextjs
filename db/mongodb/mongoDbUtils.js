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
	const collection = client.db('leftovers').collection('preppers');
	const document = await collection.findOne({ email });

	console.log(`prepper email found: ${document}:`);
	return document;
}
export async function findExistingUserEmail(client, email) {
	const collection = client.db('leftovers').collection('users');
	const document = await collection.findOne({ email });

	console.log(`user email found: ${document}:`);
	return document;
}
