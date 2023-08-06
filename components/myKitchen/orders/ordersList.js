import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import OrdersListItem from './ordersListItem';
import Link from 'next/link';

const OrdersList = ({ myOrders }) => {
	return (
		<Box
			display="flex"
			flexDirection={'column'}
			justifyContent={'flex-start'}
			alignItems={'flex-start'}
			minHeight={'100vh'}
			width={{ xs: '100%', sm: '90%', md: '80%' }}
			gap={5}
		>
			{myOrders.length > 0 &&
				myOrders.map(({ id, items, created_at, total }) => {
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
								justifyContent={'space-between'}
								alignItems={'flex-start'}
								mb={'2rem'}
							>
								<Box
									display={'flex'}
									flexDirection={{ xs: 'column', sm: 'row' }}
									gap={{ xs: 2, sm: 5 }}
								>
									<Box>
										<Typography variant="h3">Date</Typography>
										<Typography fontSize={{ xs: 'small', sm: 'large' }}>
											{newDate}
										</Typography>
									</Box>
									<Box>
										<Typography variant="h3">Total</Typography>
										<Typography fontSize={{ xs: 'small', sm: 'large' }}>
											${total}
										</Typography>
									</Box>
								</Box>
								<Box>
									<Typography variant="h3">Order #</Typography>
									<Link href={'/'}>
										<Typography fontSize={{ xs: 'small', sm: 'large' }}>
											{id}
										</Typography>
									</Link>
								</Box>
							</Box>
							<OrdersListItem items={items} />
						</Paper>
					);
				})}
		</Box>
	);
};

export default OrdersList;
