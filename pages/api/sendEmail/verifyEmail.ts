import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDb } from '../../../db/mongodb/mongoose';
import User from '../../../db/mongodb/models/userModel';
import { sendEmail } from '../../../utils/mailer/mailer';

const verifyEmail = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(400).json({ error: 'invalid request' });
	const { email, userId, emailType } = req.body;
	try {
		const emailResponse = await sendEmail({ email, userId, emailType });
		console.log('email response', emailResponse);
		return res.status(200).json({ message: 'Successfully verified Email' });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default verifyEmail;
