import React from 'react';
import Box from '@mui/material/Box';
import MyOrderCard from './myOrderCard';

const MyOrdersList = ({ myOrders, currentUserEmail }) => {
	return (
		<Box
			display="flex"
			flexDirection={'column'}
			justifyContent={'flex-start'}
			alignItems={'center'}
			height={'100%'}
			width={{ xs: '100%', sm: '90%', md: '80%' }}
			px={3}
			pb={3}
			gap={5}
		>
			{myOrders.length > 0 &&
				myOrders.map((order) => {
					return (
						<MyOrderCard
							key={order.id}
							order={order}
							currentUserEmail={currentUserEmail}
						/>
					);
				})}
		</Box>
	);
};

export default MyOrdersList;
