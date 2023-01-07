import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const CartItem = ({ foodItem, price, img = '/pixzolo.jpg', id }) => {
	return (
		<Box
			key={id}
			display={'flex'}
			justifyContent='space-between'
			width={'100%'}
			px='20px'
			alignItems='center'
			borderBottom={'1px solid black'}
			height='100px'>
			<Box>
				<Image src={img} alt='food item' width={50} height={50} />
			</Box>
			<Box>
				<Typography>{foodItem}</Typography>
			</Box>
			<Box>
				<Typography>${price}</Typography>
			</Box>
		</Box>
	);
};

export default CartItem;
