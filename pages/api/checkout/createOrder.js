import { createOrderDb } from '../../../db/mongodb/mongoDbUtils';
import { incrementMealsServedDB } from '../../../db/mongodb/mongoose';

const createOrder = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'Invalid request' });
	}
	const order = req.body;
	try {
		const orderDetails = await createOrderDb(order);

		if (orderDetails.prepperEmail) {
			const updatedServed = await incrementMealsServedDB(
				orderDetails.prepperEmail
			);
		}

		const formattedId = orderDetails._id.toString();

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
