import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import { mockDataContacts } from '../../db/mockData';
import NotificationItem from '../../components/notifications/notificationItem';

export async function getServerSideProps({ req, res, params }) {
	const session = await getServerSession(req, res, authOptions);
	const messageId = params.mid;
	console.log(messageId);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	const messageDetails =
		messageId &&
		mockDataContacts.find((message) => message.id.toString() === messageId);
	console.log(messageDetails);
	// const client = await connectMongoDb();
	// const userDb = await findExistingPrepperEmail(client, session.user.email);

	return {
		props: {
			userData: session.user,
			messageDetails: messageDetails ? messageDetails : [],
		},
	};
}

const Message = ({ messageDetails, userData }) => {
	console.log(messageDetails);
	const { name, email, id, message } = messageDetails;

	return (
		<Box
			display={'flex'}
			justifyContent='center'
			alignItems={'center'}
			width='100%'
			height='100vh'>
			<Head>
				<title>Message</title>
				<meta name='description' content='message details' />
			</Head>
			<Paper sx={{ width: '50em', height: '50em' }}>
				<Stack m='3em'>
					<Box>
						<Typography>{name}</Typography>
						<Typography>{email}</Typography>
					</Box>
					<Box mt='5em'>
						<Typography>{message}</Typography>
					</Box>
				</Stack>
			</Paper>
		</Box>
	);
};

export default Message;
