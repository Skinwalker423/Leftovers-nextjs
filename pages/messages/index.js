import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import NotificationList from '../../components/notifications/notificationList';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';

export async function getServerSideProps({ req, res }) {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	console.log(session);

	// const client = await connectMongoDb();
	// const userDb = await findExistingPrepperEmail(client, session.user.email);

	return {
		props: {
			userData: session.user,
		},
	};
}

const Messages = ({ userData }) => {
	return (
		<Box
			width={'100%'}
			display={'flex'}
			justifyContent='center'
			alignItems={'center'}
			mt='5em'
			flexDirection='column'>
			<Head>
				<title>Messages</title>
				<meta name='description' content='read your direct messages' />
			</Head>
			<Box py={'3em'}>
				<Typography variant='h1' textAlign={'center'}>
					{userData.email}
				</Typography>
			</Box>
			<Box width={{ xs: '80%', lg: '65%', xl: '50%' }}>
				<NotificationList />
			</Box>
		</Box>
	);
};

export default Messages;
