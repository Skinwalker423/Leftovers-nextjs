import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const CaritItem = ({ item, price, img = '/pixzolo.jpg' }) => {
	return (
		<Box
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
				<Typography>{item}</Typography>
			</Box>
			<Box>
				<Typography>${price}</Typography>
			</Box>
		</Box>
	);
};

export default CaritItem;
