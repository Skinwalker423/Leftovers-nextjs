import { updateOrderStatusById } from '../../../db/mongodb/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const updateStatus = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'invalid request' });
	}
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ error: 'unauthorized' });
	}

	const { orderId, status, prepperEmail } = req.body;

	const prepperCheck = session?.user?.email !== prepperEmail;

	if (prepperCheck) {
		return res.status(401).json({ error: 'unauthorized user' });
	}

	try {
		const updatedOrder = await updateOrderStatusById(orderId, status);

		return res.status(200).json({
			message: 'successfully updated order status',
			data: updatedOrder
		});
	} catch (error) {
		return res.status(500).json({ error: 'problem updating order' });
	}
};

export default updateStatus;
