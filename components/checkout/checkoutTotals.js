import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { UserContext } from '../../store/UserContext';
import { useColors } from '../../hooks/useColors';

const CheckoutTotals = () => {
	const { state } = useContext(UserContext);
	const { colors } = useColors();

	const handlePayBtn = async () => {
		//add number of served to prepper trophy icon
	};

	return (
		<Box
			display='flex'
			flexDirection={'column'}
			height='100vh'
			alignItems='center'
			justifyContent='space-evenly'
			width='100%'
			sx={{ borderLeft: `1px solid ${colors.orangeAccent[900]}` }}
			p='5rem'>
			<Box>
				<Typography variant='h2'>
					Total costs with shipping and handling
				</Typography>
				<Typography>details</Typography>
			</Box>
			<Box
				sx={{
					borderTop: `1px solid ${colors.orangeAccent[900]}`,
					pt: '20px',
				}}
				display={'flex'}
				width='100%'>
				<Box
					display={'flex'}
					width='100%'
					alignItems='center'
					justifyContent='space-evenly'>
					<Button onClick={handlePayBtn} variant='contained' color='success'>
						Pay
					</Button>
					<Typography textAlign={'end'}>
						Total: ${Math.round(state.cartTotalPrice * 100) / 100}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default CheckoutTotals;
