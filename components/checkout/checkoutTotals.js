import React, { useContext } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { UserContext } from '../../store/UserContext';
import { useColors } from '../../hooks/useColors';

const CheckoutTotals = ({ onPaymentClick, loading }) => {
	const { state } = useContext(UserContext);
	const { colors } = useColors();
	const { userCartlist } = state;

	const totalCost = Math.round(state.cartTotalPrice * 100) / 100;
	const fees = !totalCost ? 0 : Math.round(totalCost * 0.1 * 100) / 100;
	const total = !totalCost ? 0 : totalCost + fees;

	const handlePayBtn = async () => {
		await onPaymentClick();
	};

	return (
		<Box
			display="flex"
			flexDirection={'column'}
			height="100vh"
			alignItems="center"
			justifyContent="space-evenly"
			width="100%"
		>
			<Box
				width={'100%'}
				px={{ xs: 5, lg: 10, xl: 15 }}
				py={2}
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'flex-start'}
				gap={3}
			>
				<Typography
					sx={{ backgroundColor: colors.primary[400], p: 2 }}
					variant="h4"
				>
					cost: ${totalCost}
				</Typography>

				<Typography
					sx={{ backgroundColor: colors.primary[400], p: 2 }}
					variant="h4"
				>
					fees: ${fees}
				</Typography>

				<Divider sx={{ backgroundColor: colors.orangeAccent[700] }} />
				<Typography
					sx={{ backgroundColor: colors.primary[400], p: 2 }}
					variant="h4"
				>
					Total: ${total}
				</Typography>
			</Box>
			<Box
				sx={{
					borderTop: `1px solid ${colors.orangeAccent[900]}`,
					pt: '20px'
				}}
				display={'flex'}
				width="100%"
			>
				<Box
					display={'flex'}
					width="100%"
					alignItems="center"
					justifyContent="space-evenly"
				>
					<Button
						disabled={loading || userCartlist.length < 1}
						onClick={handlePayBtn}
						variant="contained"
						color="success"
						sx={{ px: 4, py: 2, width: '50%', fontSize: 'x-large' }}
					>
						Pay
					</Button>
					<Typography fontSize={'x-large'} textAlign={'end'}>
						Total: ${!total && userCartlist.length > 0 ? 'Free' : 0}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default CheckoutTotals;
