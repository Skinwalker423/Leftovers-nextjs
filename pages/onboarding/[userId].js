import React from 'react';
import User from '../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../db/mongodb/mongoose';
import { Alert, Box, Button, Typography } from '@mui/material';
import { requestEmailConfirmation } from '../../utils/mailer/requestEmailConfirmation';
import { EmailTypes } from '../../utils/mailer/mailer';

export async function getServerSideProps({ req, res, params: { userId } }) {
	console.log('user id', userId);
	if (!userId) {
		return {
			notFound: true
		};
	}
	try {
		await connectToMongoDb();
		const newUser = await User.findById(userId);
		if (!newUser) {
			return {
				redirect: {
					destination: '/signin',
					permanent: false
				}
			};
		}
		console.log('user in server', newUser);

		const formattedUser = {
			id: newUser._id.toString(),
			email: newUser.email,
			isVerified: newUser?.isVerified
		};

		return {
			props: {
				user: formattedUser
			}
		};
	} catch (error) {
		return {
			props: {
				error: error.message
			}
		};
	}
}

const onboarding = ({ error, user }) => {
	if (error) return error;

	console.log('user', user);

	const handleVerifyEmail = async () => {
		console.log('sending verification email');
		const emailRes = await requestEmailConfirmation({
			email: user.email,
			emailType: EmailTypes.VERIFY,
			userId: user.id
		});
		if (emailRes.error) {
			console.log('problem with sending email', emailRes.error);
		} else {
			console.log('res message', emailRes.message);
		}
	};

	return (
		<Box>
			<Typography variant="h1">Onboarding</Typography>
			{user?.isVerified ? (
				<Alert
					sx={{
						width: '100%',
						fontSize: 'larger'
					}}
					severity="success"
				>
					Already Verified
				</Alert>
			) : (
				<Box>
					<Button onClick={handleVerifyEmail}>Verify Email</Button>
				</Box>
			)}
		</Box>
	);
};

export default onboarding;
