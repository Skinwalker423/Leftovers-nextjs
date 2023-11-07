import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../db/mongodb/mongoose';

enum EmailTypes {
	RESET = 'RESET',
	VERIFY = 'VERIFY'
}

export const sendEmail = async ({
	email,
	emailType,
	userId
}: {
	email: string;
	emailType: EmailTypes;
	userId: string;
}) => {
	try {
		const hashedToken = bcrypt.hash(userId.toString(), 10);

		await connectToMongoDb();

		if (emailType === 'VERIFY') {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000
			});
		} else if (emailType === 'RESET') {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000
			});
		}
	} catch (error: any) {
		throw new Error(error.message);
	}

	let transport = nodemailer.createTransport({
		host: process.env.MAILTRAP_HOST,
		port: 2525,
		auth: {
			user: process.env.MAILTRAP_USER,
			pass: process.env.MAILTRAP_PASS
		}
	});
};
