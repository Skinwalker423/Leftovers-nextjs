import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useColors } from '../../../hooks/useColors';

const MyOrderMealCard = ({ item }) => {
	const { description, foodItem, id, image, price, qty, prepperId, kitchen } =
		item;
	const { colors } = useColors();
	return (
		<Box
			key={id}
			display={'flex'}
			border={`2px solid ${colors.primary[400]}`}
			boxShadow={`10px 5px 5px ${colors.primary[400]}`}
			width={'100%'}
		>
			<Box
				display={'flex'}
				justifyContent={'space-evenly'}
				width={'100%'}
				px={5}
				py={2}
				gap={3}
			>
				<Box
					display={'flex'}
					width={'100%'}
					justifyContent={{ xs: 'center', sm: 'space-between' }}
					alignItems={{ xs: 'flex-start', sm: 'center' }}
					flexDirection={{ xs: 'column', sm: 'row' }}
					gap={2}
				>
					<Box>
						<Typography
							fontWeight={600}
							sx={{
								borderBottom: '1px solid black',
								width: 'fit-content'
							}}
							variant="h4"
						>
							Item
						</Typography>
						<Typography variant="h3"> {foodItem}</Typography>
					</Box>
					<Box>
						<Typography
							fontWeight={600}
							sx={{
								borderBottom: '1px solid black',
								width: 'fit-content'
							}}
							variant="h4"
						>
							QTY
						</Typography>
						<Typography variant="h3"> {qty}</Typography>
					</Box>
					<Box>
						<Typography
							fontWeight={600}
							sx={{
								borderBottom: '1px solid black',
								width: 'fit-content'
							}}
							variant="h4"
						>
							Price
						</Typography>
						<Typography variant="h3">${price}</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default MyOrderMealCard;
