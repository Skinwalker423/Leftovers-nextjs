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
			flexDirection={{ xs: 'column', md: 'row' }}
			border={`2px solid ${colors.primary[400]}`}
			boxShadow={`10px 5px 5px ${colors.primary[400]}`}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'space-evenly'}
				width={'100%'}
				px={5}
				py={2}
				gap={3}
			>
				<Box
					display={'flex'}
					width={'100%'}
					justifyContent={'space-between'}
					alignItems={'center'}
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
							Price
						</Typography>
						<Typography variant="h3">${price}</Typography>
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
						Kitchen
					</Typography>
					<Link
						style={{ textDecoration: 'none' }}
						href={`/preppers/${prepperId}`}
					>
						<Typography
							variant="h3"
							sx={{
								color: colors.orangeAccent[400],
								textDecoration: 'none',
								':hover': {
									color: colors.orangeAccent[200]
								}
							}}
						>
							{kitchen}
						</Typography>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default MyOrderMealCard;
