import React, { useState } from 'react';
import User from '../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../db/mongodb/mongoose';
import { Alert, Box, Button, Paper, Typography } from '@mui/material';
import { requestEmailConfirmation } from '../../utils/mailer/requestEmailConfirmation';
import { EmailTypes } from '../../utils/mailer/mailer';
import SuccessAlert from '../../components/UI/alert/successAlert';
import ErrorAlert from '../../components/UI/alert/ErrorAlert';
import Panel from '../../components/profile/panel';

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
		<Box
			width={'100vw'}
			height={'100%'}
			px={{ xs: 2, sm: 5, md: 10, lg: 20 }}
			py={5}
		>
			<Typography sx={{ pb: 5 }} textAlign={'center'} variant="h1">
				Onboarding Profile
			</Typography>
			<Paper
				sx={{
					height: '100%',
					width: '100%',
					borderRadius: '5px',
					px: { xs: 2, sm: 5 },
					py: 2
				}}
			>
				<Panel title="Email Verification Status">
					{user?.isVerified ? (
						<Alert
							sx={{
								width: '50%',
								fontSize: 'larger'
							}}
							severity="success"
							variant="filled"
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
				</Panel>
				<Panel title="Email">
					<Box>
						<Typography>{user.email}</Typography>
					</Box>
				</Panel>
				<Panel title="Name">
					<Box>
						<Typography>{user.name || 'N/A'}</Typography>
					</Box>
				</Panel>
			</Paper>
			{msg.length > 0 && <SuccessAlert msg={msg} setMsg={setMsg} />}
			{error.length > 0 && <ErrorAlert error={error} setError={setError} />}
		</Box>
	);
};

export default onboarding;
