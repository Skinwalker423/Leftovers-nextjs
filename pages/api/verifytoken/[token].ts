import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDb } from '../../../db/mongodb/mongoose';
import User from '../../../db/mongodb/models/userModel';

const verifyToken = async (req: NextApiRequest, res: NextApiResponse) => {
	const { token } = req.query;
	if (!token) return res.status(400).json({ error: 'No token found' });
	console.log('token', token);
	try {
		await connectToMongoDb();
		const foundUser = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() }
		});

		if (!foundUser) return res.status(400).json({ error: 'User not found' });

		console.log('found user', foundUser);

		foundUser.isVerified = true;
		foundUser.verifyToken = undefined;
		foundUser.verifyTokenExpiry = undefined;

		await foundUser.save();

		return res.status(200).json({ message: 'Successfully verified Email' });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default verifyToken;
