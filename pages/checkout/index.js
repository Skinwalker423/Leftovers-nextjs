import React, { useContext, useState } from 'react';
import {
	Box,
	Divider,
	Alert,
	Typography,
	useTheme,
	useMediaQuery
} from '@mui/material';
import CheckoutList from '../../components/checkout/checkoutList';
import CheckoutTotals from '../../components/checkout/checkoutTotals';
import Head from 'next/head';
import { UserContext } from '../../store/UserContext';
import { decrementMealQtyDB } from '../../utils/meals';
import { useRouter } from 'next/router';
import { ACTION_TYPES } from '../../store/UserContext';
import { useColors } from '../../hooks/useColors';
import ErrorAlert from '../../components/UI/alert/ErrorAlert';

const Checkout = () => {
	const { state, dispatch } = useContext(UserContext);
	const { userCartlist } = state;
	const [msg, setMsg] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { colors } = useColors();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const dividerResponse = matches ? 'vertical' : 'horizontal';

	const onPaymentClick = async () => {
		if (userCartlist.length < 1) {
			setError('No items in cart');
			return;
		}
		setLoading(true);

		//process payment
		//add number of served to prepper trophy icon

		const orderConfirmation = window.crypto.randomUUID();
		console.log(orderConfirmation);
		let orderSlug = `/checkout/${orderConfirmation}/`;
		for (const item of userCartlist) {
			const { prepperEmail, id, qty } = item;
			console.log(prepperEmail, id, qty);
			orderSlug += prepperEmail;
			try {
				const data = await decrementMealQtyDB(prepperEmail, id, qty);
				if (data.message) {
					console.log('qty updated', data.message);
					setLoading(false);

					dispatch({ type: ACTION_TYPES.CLEAR_CARTLIST });
					dispatch({ type: ACTION_TYPES.SET_TOTAL_PRICE, payload: 0 });
				}
				if (data.error) {
					console.log('problem', data.error);
					setLoading(false);
					setError(data.error);
				}
			} catch (err) {
				setError(err);
			}
		}
		setMsg('Payment complete');
		router.push(orderSlug);
	};

	return (
		<Box
			display="flex"
			width={'100%'}
			height="100vh"
			flexDirection={{ xs: 'column', md: 'row' }}
			justifyContent={'space-evenly'}
		>
			<Head>
				<title>Checkout</title>
				<meta
					name="description"
					content="Checkout page. Confirm the meals, cost, and pay options before completing your order"
				/>
			</Head>
			<CheckoutList />
			<Divider
				variant="middle"
				orientation={dividerResponse}
				color={colors.orangeAccent[900]}
			/>
			<CheckoutTotals loading={loading} onPaymentClick={onPaymentClick} />
			{(msg || loading) && (
				<Alert
					color={loading ? 'warning' : 'success'}
					variant="filled"
					sx={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						fontSize: 'larger',
						textAlign: 'center',
						justifyContent: 'center',
						zIndex: 50
					}}
				>
					<Typography fontSize={'3rem'}>
						{loading ? 'Processing payment...' : msg}
					</Typography>
				</Alert>
			)}

			{error && <ErrorAlert error={error} setError={setError} />}
		</Box>
	);
};

export default Checkout;
