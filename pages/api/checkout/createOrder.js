import { createOrderDb } from '../../../db/mongodb/mongoDbUtils';
const ObjectID = require('mongodb').ObjectId;

const createOrder = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'Invalid request' });
	}
	const order = req.body;
	console.log(order);
	const orderDetails = await createOrderDb(order);

	if (!orderDetails.insertedId) {
		return res.status(500).json({ error: 'problem creating order in db' });
	}

	const formattedId = orderDetails.insertedId.toString();
	console.log('this is the formatted id:', formattedId);

	return res.status(200).json({
		message: 'request to create order completed',
		data: formattedId
	});
};

export default createOrder;
