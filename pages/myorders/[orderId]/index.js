import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import OrderCard from '../../../components/myKitchen/orders/orderCard';
import { fetchOrderById } from '../../../db/mongodb/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';

export async function getServerSideProps({ req, res, params }) {
	const orderId = params.orderId;
	const session = await getServerSession(req, res, authOptions);

	const userEmail = session?.user?.email;

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		};
	}

	const order = await fetchOrderById(orderId);

	if (userEmail !== order.userEmail) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			order,
			userEmail
		}
	};
}

const OrderDetails = ({ order, userEmail }) => {
	return (
		<Box
			display={'flex'}
			justifyContent={'center'}
			alignItems={{ xs: 'flex-start', sm: 'center' }}
			width={'100%'}
			px={2}
			py={1}
			height={'100vh'}
		>
			<Head>
				<title>My Order Details</title>
				<meta
					name="description"
					content="view the details of an order to learn more information"
				/>
			</Head>
			<OrderCard order={order} currentUserEmail={userEmail} />
		</Box>
	);
};

export default OrderDetails;
