// import nodemailer from 'nodemailer';
// import bcrypt from 'bcrypt';
// import User from '../../db/mongodb/models/userModel';
// import { connectToMongoDb } from '../../db/mongodb/mongoose';

export enum EmailTypes {
	RESET = 'RESET',
	VERIFY = 'VERIFY'
}

// export const sendEmail = async ({
// 	email,
// 	emailType,
// 	userId
// }: {
// 	email: string;
// 	emailType: EmailTypes;
// 	userId: string;
// }) => {
// 	try {
// 		const hashedToken = bcrypt.hash(userId.toString(), 10);

// 		await connectToMongoDb();

// 		if (emailType === 'VERIFY') {
// 			const updatedUser = await User.findByIdAndUpdate(
// 				userId,
// 				{
// 					verifyToken: hashedToken,
// 					verifyTokenExpiry: Date.now() + 3600000
// 				},
// 				{ new: true }
// 			);

// 			if (!updatedUser.verifyToken) return;
// 		} else if (emailType === 'RESET') {
// 			const updatedUser = await User.findByIdAndUpdate(
// 				userId,
// 				{
// 					forgotPasswordToken: hashedToken,
// 					forgotPasswordTokenExpiry: Date.now() + 3600000
// 				},
// 				{ new: true }
// 			);
// 			if (!updatedUser.forgotPasswordToken) return;
// 		}

// 		let transport = nodemailer.createTransport({
// 			host: process.env.MAILTRAP_HOST,
// 			port: 2525,
// 			auth: {
// 				user: process.env.MAILTRAP_USER,
// 				pass: process.env.MAILTRAP_PASS
// 			}
// 		});

// 		const mailOptions = {
// 			from: 'skinwalker42398@gmail.com',
// 			to: email,
// 			subject:
// 				emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset your password',
// 			html: `
//         <p>
//           Click the link to ${
// 						emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
// 					}
//           <a href=${
// 						process.env.NEXT_PUBLIC_BASE_URL
// 					}api/verifytoken/${hashedToken}>${
// 				process.env.NEXT_PUBLIC_BASE_URL
// 			}api/verifytoken/${hashedToken}</a>
//         </p>

//       `
// 		};

// 		const mailResponse = await transport.sendMail(mailOptions);
// 		return mailResponse;
// 	} catch (error: any) {
// 		throw new Error(error.message);
// 	}
// };
