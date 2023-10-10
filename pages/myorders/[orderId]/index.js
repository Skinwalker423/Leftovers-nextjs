import React from 'react';
import { Box } from '@mui/material';
import OrderCard from '../../../components/myKitchen/orders/orderCard';
import { fetchOrderById } from '../../../db/mongodb/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';

export async function getServerSideProps({ req, res, params }) {
	const orderId = params.orderId;
	const session = await getServerSession(req, res, authOptions);

	const userEmail = session?.user?.email;

	console.log('session', session);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		};
	}

	const order = await fetchOrderById(orderId);
	console.log('order in ssr', order);

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
	console.log('order', order);
	return (
		<Box>
			<OrderCard order={order} currentUserEmail={userEmail} />
		</Box>
	);
};

export default OrderDetails;
