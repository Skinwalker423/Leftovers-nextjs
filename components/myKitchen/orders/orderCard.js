import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useColors } from '../../../hooks/useColors';
import UpdateOrderStatusForm from '../../UI/form/mykitchen/updateOrderStatus';
import OrderMealItems from './orderMealtems';
import { formatDateString } from '../../../utils/dates';

const OrderCard = ({ order, currentUserEmail, setMsg }) => {
	const { colors } = useColors();
	const { id, items, created_at, total, prepperEmail, mealStatus } = order;
	const [status, setStatus] = useState(mealStatus);
	const newDate = formatDateString(created_at);

	let statusColor = colors.orangeAccent[400];
	if (status === 'fulfilled') {
		statusColor = colors.greenAccent[400];
	} else if (status === 'unfulfilled') {
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
					justifyContent={'space-between'}
					gap={{ xs: 2, sm: 10 }}
					width={{ xs: '100%', sm: 'unset' }}
				>
					<Box>
						<Typography variant="h3">Date</Typography>
						<Typography fontSize={{ xs: 'medium', sm: 'large' }}>
							{newDate}
						</Typography>
					</Box>
					<Box>
						<Typography variant="h3">Total</Typography>
						<Typography fontSize={{ xs: 'medium', sm: 'large' }}>
							${total}
						</Typography>
					</Box>
				</Box>
				<Box>
					<Typography variant="h3">Order #</Typography>

					<Typography fontSize={{ xs: 'medium', sm: 'large' }}>{id}</Typography>
				</Box>
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
					<Typography
						variant="h3"
						sx={{ fontSize: { xs: 'medium', sm: 'large' } }}
					>
						Status:
					</Typography>
					<Typography
						variant="span"
						textAlign={'center'}
						color={statusColor}
						sx={{
							borderRadius: 5
						}}
						fontSize={{ xs: 'medium', sm: 'large' }}
					>
						{status}
					</Typography>
				</Box>
				{prepperEmail === currentUserEmail && (
					<UpdateOrderStatusForm
						orderId={id}
						setMsg={setMsg}
						prepperEmail={prepperEmail}
						setStatus={setStatus}
					/>
				)}
			</Box>
			<OrderMealItems items={items} />
		</Paper>
	);
};

export default OrderCard;
