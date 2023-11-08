import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDb } from '../../../db/mongodb/mongoose';
import User from '../../../db/mongodb/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const verifyEmail = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(400).json({ error: 'invalid request' });
	const { email, userId, emailType } = req.body;
	try {
		const hashedToken = bcrypt.hash(userId.toString(), 10);

		await connectToMongoDb();

		if (emailType === 'VERIFY') {
			const updatedUser = await User.findByIdAndUpdate(
				userId,
				{
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 3600000
				},
				{ new: true }
			);

			if (!updatedUser.verifyToken) return;
		} else if (emailType === 'RESET') {
			const updatedUser = await User.findByIdAndUpdate(
				userId,
				{
					forgotPasswordToken: hashedToken,
					forgotPasswordTokenExpiry: Date.now() + 3600000
				},
				{ new: true }
			);
			if (!updatedUser.forgotPasswordToken) return;
		}

		let transport = nodemailer.createTransport({
			host: process.env.MAILTRAP_HOST,
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS
			}
		});

		const mailOptions = {
			from: 'skinwalker42398@gmail.com',
			to: email,
			subject:
				emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset your password',
			html: `
        <p>
          Click the link to ${
						emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
					}
          <a href=${
						process.env.NEXT_PUBLIC_BASE_URL
					}api/verifytoken/${hashedToken}>${
				process.env.NEXT_PUBLIC_BASE_URL
			}api/verifytoken/${hashedToken}</a>
        </p>

      `
		};

		const mailResponse = await transport.sendMail(mailOptions);
		console.log('mail response', mailResponse);
		if (!mailResponse)
			return res.status(500).json({ error: 'problem sending mail' });
		return res.status(200).json({ message: 'Successfully verified Email' });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default verifyEmail;
