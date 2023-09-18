import { createOrderDb } from '../../../db/mongodb/mongoDbUtils';
import { incrementMealsServedDB } from '../../../db/mongodb/mongoose';

const createOrder = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'Invalid request' });
	}
	const order = req.body;
	console.log('body from fetch request', order);
	try {
		const orderDetails = await createOrderDb(order);
		console.log('order details', orderDetails);

		const updatedServed = await incrementMealsServedDB(order.prepperEmail);
		console.log('meals served updated', updatedServed);
		const formattedId = orderDetails._id.toString();
		console.log('this is the formatted id:', formattedId);

		return res.status(200).json({
			message: 'request to create order completed',
			data: formattedId
		});
	} catch (error) {
		return res
			.status(500)
			.json({ error: `problem creating order in db: ${error}` });
	}
};

export default createOrder;
