import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useColors } from '../../../hooks/useColors';
import UpdateOrderStatusForm from '../../UI/form/mykitchen/updateOrderStatus';
import OrderMealItems from './orderMealtems';
import Link from 'next/link';

const OrderCard = ({ order, currentUserEmail, setMsg }) => {
	const { colors } = useColors();
	const { id, items, created_at, total, prepperEmail, mealStatus } = order;
	const [status, setStatus] = useState(mealStatus);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	const newDate = new Date(created_at).toLocaleDateString(undefined, options);
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
					// flexDirection={{ xs: 'column', sm: 'row' }}
					gap={{ xs: 2, sm: 5 }}
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
					<Link href={`/myorders/${id}`}>
						<Typography fontSize={{ xs: 'medium', sm: 'large' }}>
							{id}
						</Typography>
					</Link>
				</Box>
			</Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				p={2}
				my={5}
				border={`1px solid ${colors.greenAccent[400]}`}
			>
				<Box display={'flex'} alignItems={'center'} gap={1}>
					<Typography variant="h3">Status:</Typography>
					<Typography
						variant="span"
						textAlign={'center'}
						color={colors.greenAccent[400]}
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
