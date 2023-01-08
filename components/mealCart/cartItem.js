import React, { useState, useContext } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import { UserContext } from '../../store/UserContext';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CartItem = ({ foodItem, price, img = '/pixzolo.jpg', id, qty }) => {
	const { state, dispatch } = useContext(UserContext);

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
				<Image src={img} alt={foodItem} width={50} height={50} />
			</Box>
			<Box>
				<Typography>{foodItem}</Typography>
			</Box>
			<Box>
				<Typography>qty: {qty}</Typography>
			</Box>
			<Stack>
				<IconButton>
					<KeyboardArrowUpIcon />
				</IconButton>
				<IconButton>
					<KeyboardArrowDownIcon />
				</IconButton>
			</Stack>
			<Box>
				<Typography>${Math.round(price * qty * 100) / 100}</Typography>
			</Box>
		</Box>
	);
};

export default CartItem;
