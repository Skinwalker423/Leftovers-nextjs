import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import { connectMongoDb } from '../../db/mongodb/mongoDbUtils';
import { findAllOrdersByUserEmail } from '../../db/mongodb/mongoDbUtils';
import OrdersList from '../../components/myKitchen/orders/ordersList';

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
	const currentUserEmail = userData?.email;
	return (
		<Box
			width={'100%'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			flexDirection="column"
			gap={5}
		>
			<Head>
				<title>MyOrders</title>
				<meta name="description" content="view all order history and details" />
			</Head>

			<Typography component={'h1'} fontSize={'5rem'}>
				Orders
			</Typography>
			<OrdersList myOrders={orders} currentUserEmail={currentUserEmail} />
		</Box>
	);
};

export default MyOrders;
