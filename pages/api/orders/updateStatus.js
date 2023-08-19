import { updateOrderStatusById } from '../../../db/mongodb/mongoose';

const updateStatus = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'invalid request' });
	}
	const { orderId, status } = req.body;

	try {
		const updatedOrder = await updateOrderStatusById(orderId, status);

		return res.status(200).json({
			message: 'successfully updated order status',
			data: updatedOrder
		});
	} catch (error) {
		console.log('error updating order', error.message);
		return res.status(500).json({ error: 'problem updating order' });
	}
};

export default updateStatus;
