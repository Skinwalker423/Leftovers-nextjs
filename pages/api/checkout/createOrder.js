import { createOrderDb } from '../../../db/mongodb/mongoDbUtils';
const ObjectID = require('mongodb').ObjectId;

const createOrder = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'Invalid request' });
	}
	const order = req.body;
	const orderDetails = await createOrderDb(order);
	console.log('order details', orderDetails);

	if (!orderDetails) {
		return res.status(500).json({ error: 'problem creating order in db' });
	}

	const formattedId = orderDetails._id.toString();
	console.log('this is the formatted id:', formattedId);

	return res.status(200).json({
		message: 'request to create order completed',
		data: formattedId
	});
};

export default createOrder;
