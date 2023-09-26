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
	return document;
}
export async function createOrderDb(doc) {
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
			kitchenImgUrl,
			profileImgUrl,
			mealsServed
		}) => {
			return {
				name: `${firstName} ${lastName}`,
				email: email,
				id: _id.toString(),
				description: description,
				kitchenTitle: kitchenTitle,
				kitchenImgUrl: kitchenImgUrl || '',
				profileImgUrl,
				mealsServed
			};
		}
	);

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
			lastModified: document?.last_modified?.toString(),
			savedKitchenImages: document.savedKitchenImages,
			savedProfileImages: document.savedProfileImages,
			savedMealImages: document.savedMealImages,
			profileImgUrl: document?.profileImgUrl,
			isKitchenClosed: document.isKitchenClosed,
			mealsServed: document.mealsServed
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
		console.log('document', document);
		const formattedDoc = {
			id: document?._id.toString(),
			email: document?.email,
			favorites: document?.favorites,
			password: document?.password,
			image: document?.image,
			name: `${document.firstName} ${document.lastName}`,
			joined: document?.createdAt?.toString(),
			defaultZipcode: document?.defaultZipcode
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
			lastModified: document?.last_modified?.toString(),
			savedKitchenImages: document.savedKitchenImages,
			savedProfileImages: document.savedProfileImages,
			savedMealImages: document.savedMealImages,
			profileImgUrl: document?.profileImgUrl,
			isKitchenClosed: document.isKitchenClosed,
			mealsServed: document.mealsServed
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
			return [];
		}
		const mappedDoc = data.map(
			({
				_id,
				firstName,
				lastName,
				email,
				description,
				meals,
				kitchenTitle,
				kitchenImgUrl,
				profileImgUrl,
				savedProfileImages,
				savedKitchenImages,
				savedMealImages,
				isKitchenClosed,
				mealsServed
			}) => {
				return {
					name: `${firstName} ${lastName}`,
					email,
					id: _id.toString(),
					description,
					meals: [
						{
							id: meals.id || null,
							title: meals.title || null,
							price: meals.price || null,
							description: meals.description || null,
							image: meals?.image || null,
							qty: meals.qty || null
						}
					],
					kitchenTitle,
					kitchenImgUrl,
					profileImgUrl,
					savedProfileImages,
					savedKitchenImages,
					savedMealImages,
					isKitchenClosed,
					mealsServed
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

		return document;
	} catch (err) {
		console.error('problem updating kitchen name', err);
		return;
	}
}

export async function updateKitchenOpenStatus(client, prepperEmail, status) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: prepperEmail
			},
			{ $set: { isKitchenClosed: status } }
		);

		if (!document) {
			return;
		}

		return document;
	} catch (err) {
		console.error('problem updating kitchen status', err);
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

		return document;
	} catch (err) {
		console.error('problem updating kitchen name', err);
		return;
	}
}

export async function updateKitchenImgUrl(
	client,
	userEmail,
	kitchenImgUrl,
	type
) {
	const add = {
		$set: { kitchenImgUrl, last_modified: new Date() },
		$push: { savedKitchenImages: kitchenImgUrl }
	};

	const update = {
		$set: { kitchenImgUrl, last_modified: new Date() }
	};

	const action = type === 'add' ? add : update;

	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail
			},
			action
		);

		if (!document) {
			return;
		}

		return document;
	} catch (err) {
		console.error('problem adding kitchen image', err);
		return;
	}
}

export async function updateMealImgUrl(
	client,
	userEmail,
	mealId,
	imgUrl,
	type
) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail,
				'meals.id': mealId
			},
			{ $set: { 'meals.$.image': imgUrl, 'meals.$.last_modified': new Date() } }
		);

		if (type === 'add') {
			const addedSavedImage = await collection.updateOne(
				{
					email: userEmail
				},
				{
					$push: { savedMealImages: imgUrl },
					$set: { last_modified: new Date() }
				}
			);
		}

		if (!document) {
			return;
		}

		return document;
	} catch (err) {
		console.error('problem adding kitchen image', err);
		return;
	}
}
export async function addImgUrlToSavedImages(client, userEmail, imgUrl) {
	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail
			},
			{
				$push: { savedMealImages: imgUrl },
				$set: { last_modified: new Date() }
			}
		);

		if (!document) {
			return;
		}

		return document;
	} catch (err) {
		console.error('problem adding meal image', err);
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

export async function updateProfileImgUrl(
	client,
	userEmail,
	profileImgUrl,
	type
) {
	const add = {
		$set: { profileImgUrl, last_modified: new Date() },
		$push: { savedProfileImages: profileImgUrl }
	};

	const update = {
		$set: { profileImgUrl, last_modified: new Date() }
	};

	const action = type === 'add' ? add : update;

	try {
		const collection = client.db('leftovers').collection('preppers');
		const document = await collection.updateOne(
			{
				email: userEmail
			},
			action
		);

		if (!document) {
			return;
		}

		return document;
	} catch (err) {
		return;
	}
}
