import React from 'react';
import OrderCard from '../../../components/myKitchen/orders/orderCard';
import { fetchOrderById } from '../../../db/mongodb/mongoose';

export async function getServerSideProps({ params }) {
	const orderId = params.orderId;
	const order = await fetchOrderById(orderId);
	console.log('order in ssr', order);

	return {
		props: {
			order: order.length ? order : []
		}
	};
}

const OrderDetails = ({ order }) => {
	console.log('order', order);
	return <div>OrderDetails</div>;
};

export default OrderDetails;
