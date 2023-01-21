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
