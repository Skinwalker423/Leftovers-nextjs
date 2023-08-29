import React from 'react';
import Box from '@mui/material/Box';
import OrderMealCard from './orderMealCard';

const OrderMealItems = ({ items }) => {
	return (
		<Box display={'flex'} flexDirection={'column'} gap={5}>
			{items.length &&
				items.map((item) => {
					return <OrderMealCard key={item.id} item={item} />;
				})}
		</Box>
	);
};

export default OrderMealItems;
