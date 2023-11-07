import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDb } from '../../../db/mongodb/mongoose';
import User from '../../../db/mongodb/models/userModel';

const verifyToken = async (req: NextApiRequest, res: NextApiResponse) => {
	const { token } = req.query;
	if (!token) return res.status(400).json({ error: 'No token found' });
	console.log('token', token);
	await connectToMongoDb();
	const foundUser = await User.findOne({
		verifyToken: token,
		verifyTokenExpiry: { $gt: Date.now() }
	});

	if (!foundUser) return res.status(400).json({ error: 'User not found' });

	console.log('found user', foundUser);

	try {
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}

	res.status(200).json(token);
};

export default verifyToken;
