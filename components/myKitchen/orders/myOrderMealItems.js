import React from 'react';
import Box from '@mui/material/Box';
import MyOrderMealCard from './myOrderMealCard';

const MyOrderMealItems = ({ items }) => {
	return (
		<Box display={'flex'} flexDirection={'column'} gap={5}>
			{items.length &&
				items.map((item) => {
					return <MyOrderMealCard key={item.id} item={item} />;
				})}
		</Box>
	);
};

export default MyOrderMealItems;
