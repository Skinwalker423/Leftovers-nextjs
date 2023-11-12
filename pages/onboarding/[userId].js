import React, { useState } from 'react';
import User from '../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../db/mongodb/mongoose';
import { Alert, Box, Button, Typography } from '@mui/material';
import { requestEmailConfirmation } from '../../utils/mailer/requestEmailConfirmation';
import { EmailTypes } from '../../utils/mailer/mailer';
import SuccessAlert from '../../components/UI/alert/successAlert';
import ErrorAlert from '../../components/UI/alert/ErrorAlert';

export async function getServerSideProps({ req, res, params: { userId } }) {
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

		const formattedUser = {
			id: newUser._id.toString(),
			email: newUser.email,
			isVerified: newUser?.isVerified,
			image: newUser?.image || '',
			name: newUser?.name || ''
		};

		return {
			props: {
				user: formattedUser
			}
		};
	} catch (error) {
		return {
			notFound: true
		};
	}
}

const onboarding = ({ user }) => {
	console.log('user', user);

	const [msg, setMsg] = useState('');
	const [error, setError] = useState('');

	const handleVerifyEmail = async () => {
		console.log('sending verification email');
		const emailRes = await requestEmailConfirmation({
			email: user.email,
			emailType: EmailTypes.VERIFY,
			userId: user.id
		});
		if (emailRes.error) {
			console.log('problem with sending email', emailRes.error);
			setError(emailRes.error);
		} else {
			console.log('res message', emailRes.message);
			setMsg(emailRes.message);
		}
	};

	return (
		<Box width={'100%'} px={20} pt={5}>
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
						<Button variant="success" onClick={handleVerifyEmail}>
							Verify Email
						</Button>
					</Box>
				)}
			</Box>
			{msg.length > 0 && <SuccessAlert msg={msg} setMsg={setMsg} />}
			{error.length > 0 && <ErrorAlert error={error} setError={setError} />}
		</Box>
	);
};

export default onboarding;
