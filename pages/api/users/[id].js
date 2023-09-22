import User from '../../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../../db/mongodb/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function updateUserDefaultZipcode(req, res) {
	if (req.method !== 'PATCH') {
		return res.status(400).json({ error: 'invalid request' });
	}

	const session = await getServerSession(req, res, authOptions);
	const { id } = req.query;
	const newZipcode = req.body;

	if (session?.user?.id !== id) {
		return res.status(401).json({ error: 'Not authorized' });
	}

	try {
		await connectToMongoDb();
		const updatedUser = await User.findByIdAndUpdate(id, {
			$set: {
				defaultZipcode: newZipcode
			}
		});
		await updatedUser.save();
		res.status(200).json({ message: 'default zipcode updated' });
	} catch (error) {
		res.status(500).json({ error: 'problem updating existing user' });
	}
}

export default updateUserDefaultZipcode;
