import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import { mockDataContacts } from '../../db/mockData';
import {
	connectMongoDb,
	findExistingPrepperEmail,
	findExistingUserEmail
} from '../../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res, params }) {
	const session = await getServerSession(req, res, authOptions);
	const messageId = params.mid;

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		};
	}

	const messageDetails =
		messageId &&
		mockDataContacts.find((message) => message.id.toString() === messageId);

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
					userData: JSON.parse(JSON.stringify(userDb)),
					messageDetails: messageDetails ? messageDetails : []
				}
			};
		}

		return {
			props: {
				userData: JSON.parse(JSON.stringify(prepperDb)),
				messageDetails: messageDetails ? messageDetails : []
			}
		};
	} catch (err) {
		return {
			notFound: true
		};
	}
}

const Message = ({ messageDetails, userData }) => {
	const { name, email, id, message } = messageDetails;

	return (
		<Box
			display={'flex'}
			justifyContent="center"
			alignItems={'center'}
			width="100%"
			height="100vh"
		>
			<Head>
				<title>Message</title>
				<meta name="description" content="message details" />
			</Head>
			<Paper sx={{ width: '50em', height: '50em' }}>
				<Stack m="3em">
					<Box>
						<Typography>{name}</Typography>
						<Typography>{email}</Typography>
					</Box>
					<Box mt="5em">
						<Typography>{message}</Typography>
					</Box>
				</Stack>
			</Paper>
		</Box>
	);
};

export default Message;
