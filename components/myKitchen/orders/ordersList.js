import React, { useState } from 'react';
import Box from '@mui/material/Box';

import { useColors } from '../../../hooks/useColors';

import OrderCard from './orderCard';

const OrdersList = ({ myOrders, currentUserEmail, setMsg }) => {
	console.log('my orders', myOrders);

	return (
		<Box
			display="flex"
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			height={'100%'}
			width={{ xs: '100%', sm: '90%', md: '80%' }}
			ml={{ xs: 0, sm: 7 }}
			p={3}
			gap={5}
		>
			{myOrders.length > 0 &&
				myOrders.map((order) => {
					return (
						<OrderCard
							key={order.id}
							order={order}
							currentUserEmail={currentUserEmail}
							setMsg={setMsg}
						/>
					);
				})}
		</Box>
	);
};

export default OrdersList;
