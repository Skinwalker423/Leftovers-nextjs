import React, { useContext } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import { UserContext } from '../../store/UserContext';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useColors } from '../../hooks/useColors';

const CartItem = ({ meal }) => {
	const { foodItem, price, img = '/pixzolo.jpg', id, qty } = meal;
	const { incrementFoodItem, decrementFoodItem, calculateTotalPrice } =
		useContext(UserContext);
	const { colors } = useColors();

	const handleIncrementArrow = () => {
		incrementFoodItem(meal);
		calculateTotalPrice();
	};
	const handleDecrementArrow = () => {
		decrementFoodItem(meal);
		calculateTotalPrice();
	};

	return (
		<Box
			key={id}
			display={'flex'}
			justifyContent="space-between"
			width={'100%'}
			alignItems="center"
			my={'2em'}
			borderTop={`1px solid ${colors.primary[100]}`}
			height="100px"
			gap={1}
		>
			<Box>
				<Image src={img} alt={foodItem} width={50} height={50} />
			</Box>
			<Box maxHeight={50} overflow={'auto'}>
				<Typography fontSize={{ xs: 'small', sm: 'medium' }}>
					{foodItem}
				</Typography>
			</Box>

			<Stack textAlign={'center'}>
				<IconButton onClick={handleIncrementArrow}>
					<KeyboardArrowUpIcon />
				</IconButton>
				<Box>
					<Typography fontSize={{ xs: 'small', sm: 'medium' }}>
						{qty}
					</Typography>
				</Box>
				<IconButton onClick={handleDecrementArrow}>
					<KeyboardArrowDownIcon />
				</IconButton>
			</Stack>
			<Box>
				<Typography fontSize={{ xs: 'small', sm: 'medium' }}>
					${Math.round(price * qty * 100) / 100}
				</Typography>
			</Box>
		</Box>
	);
};

export default CartItem;
