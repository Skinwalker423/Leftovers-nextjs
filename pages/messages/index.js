import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NotificationList from '../../components/notifications/notificationList';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import {
	connectMongoDb,
	findExistingPrepperEmail,
	findExistingUserEmail
} from '../../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		};
	}

	try {
		const client = await connectMongoDb();
		const prepperDb = await findExistingPrepperEmail(
			client,
			session.user.email
		);

		if (!prepperDb) {
			const userDb = await findExistingUserEmail(client, session.user.email);

			return {
				props: {
					userData: userDb
				}
			};
		}

		return {
			props: {
				userData: prepperDb
			}
		};
	} catch (err) {
		return {
			notFound: true
		};
	}
}

const Messages = ({ userData }) => {
	return (
		<Box
			width={'100%'}
			display={'flex'}
			justifyContent="center"
			alignItems={'center'}
			mt="5em"
			flexDirection="column"
		>
			<Head>
				<title>Messages</title>
				<meta name="description" content="read your direct messages" />
			</Head>
			<Box py={'3em'}>
				<Typography variant="h1" textAlign={'center'}>
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
