import React from 'react';
import User from '../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../db/mongodb/mongoose';
import { Box, Button, Typography } from '@mui/material';

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

		return {
			props: {
				user: newUser
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
	};

	return (
		<Box>
			<Typography variant="h1">Onboarding</Typography>
			<Box>
				<Button onClick={handleVerifyEmail}>Verify Email</Button>
			</Box>
		</Box>
	);
};

export default onboarding;
