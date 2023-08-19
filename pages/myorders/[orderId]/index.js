import React from 'react';

export async function getServerSideProps({ params }) {
	const orderId = params.orderId;
	console.log('order id', orderId);
	return {
		props: {
			order: []
		}
	};
}

const OrderDetails = ({ order }) => {
	return <div>OrderDetails</div>;
};

export default OrderDetails;
