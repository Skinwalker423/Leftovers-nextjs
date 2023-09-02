import { MongoClient, ObjectId } from 'mongodb';
const ObjectID = require('mongodb').ObjectId;
import Order from './models/orderModel';
import { connectToMongoDb } from './mongoose';

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
export async function createOrderDb(doc) {
	// const client = await connectMongoDb();
	// if (!client) return;
	// const collection = client.db('leftovers').collection('orders');
	// const document = await collection.insertOne(doc);
	console.log('doc', doc);
	const { userEmail, created_at, updated_at, items, total, prepperEmail } = doc;
	await connectToMongoDb();
	const document = new Order({
		userEmail: userEmail,
		prepperEmail: prepperEmail,
		created_at,
		updated_at,
		items,
		total
	});

	if (!document) return;
	console.log('created an order', document);
	const savedDoc = await document.save();

	return savedDoc;
}

export async function addPrepperToFavoritesListDb(client, prepper, userEmail) {
	try {
		const collection = client.db('leftovers').collection('users');
		const document = await collection.updateOne(
			{ email: userEmail },
			{
				$push: { favorites: prepper }
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
				$pull: { favorites: { id: prepperId } }
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
export async function findAllInCollection(
	client,
	collectionArg,
	skip = 0,
	limit = 5
) {
	const collection = client.db('leftovers').collection(collectionArg);
	const document = await collection.find({}).skip(skip).limit(limit).toArray();

	console.log(`document found for collection ${collectionArg}:`);
	if (!document) {
		return [];
	}

	const mappedDoc = document.map(
		({
			_id,
			firstName,
			lastName,
			email,
			description,
			kitchenTitle,
			kitchenImgUrl
		}) => {
			return {
				name: `${firstName} ${lastName}`,
				email: email,
				id: _id.toString(),
				description: description,
				kitchenTitle: kitchenTitle,
				kitchenImgUrl: kitchenImgUrl || ''
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
			return null;
		}

		const formattedDoc = {
			id: document?._id.toString(),
			email: document.email,
			location: {
				address: document.location.address,
				city: document.location.city,
				state: document.location.state,
				zipcode: document.location.zipcode
			},
			meals: document.meals,
			description: document?.description,
			kitchenTitle: document?.kitchenTitle,
			kitchenImgUrl: document?.kitchenImgUrl || '',
			name: `${document.firstName} ${document.lastName}`,
			joined: document?.createdAt?.toString(),
			lastModified: document?.last_modified?.toString()
		};

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
			return null;
		}

		const formattedDoc = {
			id: document?._id.toString(),
			email: document?.email,
			favorites: document?.favorites,
			password: document?.password,
			image: document?.image,
			name: `${document.firstName} ${document.lastName}`,
			joined: document?.createdAt?.toString()
		};

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
				zipcode: document.location.zipcode
			},
			meals: document.meals,
			description: document?.description,
			kitchenTitle: document?.kitchenTitle,
			kitchenImgUrl: document?.kitchenImgUrl || '',
			name: `${document.firstName} ${document.lastName}`
		};

		return formattedDoc;
	} catch (err) {
		client.close();
		console.error('problem retrieving user from db', err);
	}
}

export async function addMealToPrepperDb(client, email, meal) {
	const mealDetails = {
		id: ObjectId().toString(),
		...meal
	};
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{ email: email },
			{
				$push: { meals: mealDetails },
				$set: { last_modified: new Date() }
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
				$set: { last_modified: new Date() }
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

export async function findLocalPreppersWithZipcode(
	client,
	zipcode,
	skip = 0,
	limit = 10
) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const data = await collection
			.find({ 'location.zipcode': zipcode.toString() })
			.skip(skip)
			.limit(limit)
			.toArray();
		if (!data) {
			console.log('no data found with zipcode query');
			return [];
		}
		const mappedDoc = data.map(
			({
				_id,
				firstName,
				lastName,
				email,
				description,
				kitchenTitle,
				kitchenImgUrl,
				meals
			}) => {
				console.log('kicthem img url', kitchenImgUrl);
				return {
					name: `${firstName} ${lastName}`,
					email,
					id: _id.toString(),
					description,
					kitchenTitle,
					kitchenImgUrl,
					meals
				};
			}
		);

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
				'meals.id': mealId
			},
			{ $set: { 'meals.$.qty': qty, 'meals.$.last_modified': new Date() } }
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
				email: userEmail
			},
			{ $set: { kitchenTitle, last_modified: new Date() } }
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

export async function updateKitchenDescription(client, userEmail, description) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail
			},
			{ $set: { description, last_modified: new Date() } }
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

export async function addKitchenImgUrl(client, userEmail, kitchenImgUrl) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail
			},
			{
				$set: { kitchenImgUrl, last_modified: new Date() },
				$push: { savedKitchenImages: kitchenImgUrl }
			}
		);

		if (!document) {
			return;
		}
		console.log('added kitchen image', document);
		return document;
	} catch (err) {
		console.error('problem adding kitchen image', err);
		return;
	}
}

export async function updateKitchenImgUrl(client, userEmail, kitchenImgUrl) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail
			},
			{
				$set: { kitchenImgUrl, last_modified: new Date() }
			}
		);

		if (!document) {
			return;
		}
		console.log('updated kitchen image', document);
		return document;
	} catch (err) {
		console.error('problem updating kitchen image', err);
		return;
	}
}

export async function decrementMealQty(client, prepperEmail, mealId, qty) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: prepperEmail,
				'meals.id': mealId
			},
			{
				$inc: { 'meals.$.qty': -qty },
				$set: { 'meals.$.last_modified': new Date() }
			}
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

export async function findOrderWithId(id) {
	try {
		const client = await connectMongoDb();
		const collection = client.db('leftovers').collection('orders');
		const document = await collection.findOne({ _id: ObjectID(id) });
		if (!document) {
			return null;
		}
		console.log(`Order found with ID: ${document}:`);

		const prepperEmail = document.items[0].prepperEmail;
		const formattedDoc = {
			...document,
			prepperEmail,
			id: document._id.toString()
		};

		return formattedDoc;
	} catch (err) {
		console.error('problem retrieving order from db', err);
	}
}

export async function findAllOrdersByUserEmail(client, email) {
	try {
		const collection = await client.db('leftovers').collection('orders');
		const document = await collection.find({ userEmail: email }).toArray();
		if (!document) {
			return null;
		}
		console.log(`Orders found with email: ${document}:`);

		const mappedDoc = document.map((order) => {
			return {
				id: order._id.toString(),
				userEmail: order.userEmail,
				created_at: order.created_at.toString(),
				updated_at: order?.updated_at.toString(),
				items: order.items,
				total: order.total,
				prepperEmail: order.prepperEmail,
				mealStatus: order?.mealStatus || 'N/A'
			};
		});

		return mappedDoc;
	} catch (err) {
		console.error('problem retrieving orders from db', err);
	}
}
export async function findAllOrdersByPrepperEmail(client, email) {
	try {
		const collection = await client.db('leftovers').collection('orders');
		const document = await collection.find({ prepperEmail: email }).toArray();
		if (!document) {
			return null;
		}
		console.log(`Orders found with email: ${document}:`);

		const mappedDoc = document.map((order) => {
			return {
				id: order._id.toString(),
				userEmail: order.userEmail,
				created_at: order.created_at.toString(),
				updated_at: order.updated_at.toString(),
				items: order.items,
				total: order.total,
				prepperEmail: order.prepperEmail,
				mealStatus: order?.mealStatus || 'N/A'
			};
		});

		return mappedDoc;
	} catch (err) {
		console.error('problem retrieving orders from db', err);
	}
}
