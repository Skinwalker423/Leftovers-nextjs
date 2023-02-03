import React from 'react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import RegistrationForm from '../components/UI/form/registration/registrationForm';
import {
	connectMongoDb,
	findExistingPrepperEmail,
} from '../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res }) {
	const session = await unstable_getServerSession(req, res, authOptions);
	console.log('user email from session:', session.user.email);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	const client = await connectMongoDb();
	const userDb = await findExistingPrepperEmail(client, session.user.email);
	console.log('prepper found with session email:', userDb);

	return {
		props: {
			userData: session.user,
			prepper: userDb,
		},
	};
}

const myKitchen = ({ userData, prepper }) => {
	console.log(userData);
	const { email, image = '/icons8-connect.svg' } = userData;
	return (
		<Box
			width='100%'
			height={'100vh'}
			display={'flex'}
			flexDirection='row'
			justifyContent='space-around'
			alignItems={'center'}>
			<Box>
				<Typography variant='h1'>{'name'}'s Kitchen</Typography>
				<Typography variant='h2'>{email}</Typography>
				<Typography variant='h3'>Pic</Typography>
				<Image
					alt={`avatar image of ${'name'}`}
					src={image}
					width={100}
					height={100}
					priority
				/>
			</Box>
			{!prepper && <RegistrationForm title='Register Kitchen' />}
		</Box>
	);
};

export default myKitchen;
