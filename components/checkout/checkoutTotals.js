import React, { useContext } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { UserContext } from '../../store/UserContext';
import { useColors } from '../../hooks/useColors';

const CheckoutTotals = ({ onPaymentClick, loading }) => {
	const { state } = useContext(UserContext);
	const { colors } = useColors();
	const { userCartlist } = state;

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
				px={20}
				display={'flex'}
				flexDirection={'column'}
				gap={3}
			>
				<Typography
					sx={{ backgroundColor: colors.primary[400], p: 3 }}
					variant="h2"
				>
					cost:
				</Typography>
				<Divider />
				<Typography
					sx={{ backgroundColor: colors.primary[400], p: 3 }}
					variant="h2"
				>
					fees:
				</Typography>
				<Divider />
				<Typography
					sx={{ backgroundColor: colors.primary[400], p: 3 }}
					variant="h2"
				>
					estimated taxes:
				</Typography>
				<Divider />
				<Typography
					sx={{ backgroundColor: colors.primary[400], p: 3 }}
					variant="h2"
				>
					Total:
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
					>
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
