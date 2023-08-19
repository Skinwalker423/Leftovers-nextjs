import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import OrdersListItem from './ordersListItem';
import Link from 'next/link';
import { useColors } from '../../../hooks/useColors';
import { Button } from '@mui/material';
import UpdateOrderStatusForm from '../../UI/form/mykitchen/updateOrderStatus';

const OrdersList = ({ myOrders, currentUserEmail }) => {
	const { colors } = useColors();

	console.log('my orders', myOrders);

	return (
		<Box
			display="flex"
			flexDirection={'column'}
			justifyContent={'flex-center'}
			alignItems={'flex-center'}
			minHeight={'100vh'}
			width={{ xs: '100%', sm: '90%', md: '80%' }}
			ml={7}
			p={3}
			gap={5}
		>
			{myOrders.length > 0 &&
				myOrders.map(
					({ id, items, created_at, total, prepperEmail, mealStatus }) => {
						const options = {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						};
						const newDate = new Date(created_at).toLocaleDateString(
							undefined,
							options
						);

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
											{mealStatus}
										</Typography>
									</Box>
									{prepperEmail === currentUserEmail && (
										<UpdateOrderStatusForm />
									)}
								</Box>
								<OrdersListItem items={items} />
							</Paper>
						);
					}
				)}
		</Box>
	);
};

export default OrdersList;
