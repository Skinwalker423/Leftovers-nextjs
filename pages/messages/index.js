import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NotificationList from '../../components/notifications/notificationList';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import { mockDataContacts } from '../../db/mockData';

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

	//create messages collection
	//fetch messages from collection using session email

	const messages = [];

	const devList =
		process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true'
			? mockDataContacts
			: messages;

	return {
		props: {
			fetchedMessages: devList
		}
	};
}

const Messages = ({ fetchedMessages }) => {
	const devList =
		process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true'
			? mockDataContacts
			: fetchedMessages;
	return (
		<Box
			width={'100%'}
			display={'flex'}
			justifyContent="center"
			alignItems={'center'}
			flexDirection="column"
		>
			<Head>
				<title>Messages</title>
				<meta name="description" content="read your direct messages" />
			</Head>
			<Box py={'3em'}>
				<Typography variant="h1" textAlign={'center'}>
					Messages
				</Typography>
			</Box>
			<Box width={{ xs: '80%', lg: '65%', xl: '50%' }}>
				<NotificationList list={devList} />
			</Box>
		</Box>
	);
};

export default Messages;
