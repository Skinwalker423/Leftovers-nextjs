import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { UserContext } from '../../store/UserContext';
import { useColors } from '../../hooks/useColors';

const CheckoutTotals = () => {
	const { state } = useContext(UserContext);
	const { colors } = useColors();
	return (
		<Box
			display='flex'
			flexDirection={'column'}
			alignItems='center'
			justifyContent='flex-start'
			width='100%'
			p='20px'>
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
					justifyContent='space-between'>
					<Button variant='contained' color='success'>
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
