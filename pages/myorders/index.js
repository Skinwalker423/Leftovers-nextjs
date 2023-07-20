import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NotificationList from '../../components/notifications/notificationList';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import { connectMongoDb } from '../../db/mongodb/mongoDbUtils';
import { findAllOrdersByUserEmail } from '../../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);

	if (!session?.user) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		};
	}

	const client = await connectMongoDb();
	const orders = await findAllOrdersByUserEmail(client, session?.user?.email);
	console.log('These are the orders:', orders);
	const user = {
		name: session.user?.name || null,
		image: session.user?.image || null,
		email: session.user?.email || null
	};

	return {
		props: {
			userData: user,
			orders: orders || []
		}
	};
}

const MyOrders = ({ userData, orders }) => {
	console.log('orders in client', orders);
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
		</Box>
	);
};

export default MyOrders;
