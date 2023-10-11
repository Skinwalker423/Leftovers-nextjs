import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useColors } from '../../../hooks/useColors';
import Link from 'next/link';
import { formatDateString } from '../../../utils/dates';
import MyOrderMealItems from './myOrderMealItems';

const MyOrderCard = ({ order, currentUserEmail, setMsg }) => {
	const { colors } = useColors();
	const { id, items, created_at, total, prepperEmail, mealStatus } = order;
	const newDate = formatDateString(created_at);

	let statusColor = colors.orangeAccent[400];
	if (mealStatus === 'fulfilled') {
		statusColor = colors.greenAccent[400];
	} else if (mealStatus === 'unfulfilled') {
		statusColor = colors.redAccent[400];
	}

	return (
		<Paper
			sx={{ width: '100%', p: { xs: 3, md: 5 }, maxWidth: '60rem' }}
			key={id}
		>
			<Box
				display={'flex'}
				flexDirection={{ xs: 'column', sm: 'row' }}
				gap={{ xs: 2, sm: 1 }}
				justifyContent={'space-between'}
				alignItems={'flex-start'}
				mb={'2rem'}
			>
				<Box
					display={'flex'}
					flex={1}
					justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
					flexDirection={{ xs: 'column', sm: 'row' }}
				>
					<Box display={'flex'} gap={{ xs: 2, sm: 5 }}>
						<Box>
							<Typography variant="h3">Date</Typography>
							<Typography fontSize={{ xs: 'medium', sm: 'large' }}>
								{newDate}
							</Typography>
						</Box>
					</Box>

					<Box>
						<Typography variant="h3">Order #</Typography>
						<Link href={`/myorders/${id}`}>
							<Typography fontSize={{ xs: 'medium', sm: 'large' }}>
								{id}
							</Typography>
						</Link>
					</Box>
				</Box>
				<Button variant="outlined" color="secondary">
					<Link
						style={{ textDecoration: 'none', width: '100%' }}
						href={`/myorders/${id}`}
					>
						<Typography
							color={'secondary'}
							fontSize={{ xs: 'medium', sm: 'large' }}
						>
							View Details
						</Typography>
					</Link>
				</Button>
			</Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				p={2}
				my={5}
				border={`1px solid ${statusColor}`}
			>
				<Box display={'flex'} alignItems={'center'} gap={1}>
					<Typography variant="h3">Status:</Typography>
					<Typography
						variant="span"
						textAlign={'center'}
						color={statusColor}
						sx={{
							borderRadius: 5
						}}
						fontSize={{ xs: 'medium', sm: 'large' }}
					>
						{mealStatus}
					</Typography>
				</Box>
			</Box>
			<MyOrderMealItems items={items} />
		</Paper>
	);
};

export default MyOrderCard;
