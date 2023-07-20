import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useColors } from '../../../hooks/useColors';

const OrdersListItem = ({ items }) => {
	const { colors } = useColors();
	console.log('items', items);
	return (
		<Box
			border={`2px solid ${colors.primary[400]}`}
			boxShadow={`10px 5px 5px ${colors.primary[400]}`}
		>
			{items.length &&
				items.map(
					({ description, foodItem, id, image, price, qty, prepperId }) => {
						return (
							<Box
								key={id}
								display={'flex'}
								flexDirection={{ xs: 'column', md: 'row' }}
								gap={5}
							>
								<Box>
									<Image
										src={image}
										width={300}
										height={300}
										alt={`order item ${foodItem}`}
									/>
								</Box>
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
											Kitchen
										</Typography>
										<Link href={`/preppers/${prepperId}`}>
											<Typography> {prepperId}</Typography>
										</Link>
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
					}
				)}
		</Box>
	);
};

export default OrdersListItem;
