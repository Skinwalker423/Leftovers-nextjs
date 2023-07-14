import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const OrdersListItem = ({ items }) => {
	return (
		<Box>
			{items.length &&
				items.map(({ description, foodItem, id, image, price, qty }) => {
					return (
						<Box key={id} display={'flex'} gap={5}>
							<Image
								src={image}
								width={300}
								height={300}
								alt={`order item ${foodItem}`}
							/>
							<Box
								display={'flex'}
								flexDirection={'column'}
								justifyContent={'space-evenly'}
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
									<Typography> {foodItem}</Typography>
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
										Description
									</Typography>
									<Typography> {description}</Typography>
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
									<Typography>${price}</Typography>
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
									<Typography> {qty}</Typography>
								</Box>
							</Box>
						</Box>
					);
				})}
		</Box>
	);
};

export default OrdersListItem;
