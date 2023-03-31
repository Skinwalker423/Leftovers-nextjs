import React, { useContext, useState } from 'react';
import { Box, Divider, Alert, Typography } from '@mui/material';
import CheckoutList from '../components/checkout/checkoutList';
import CheckoutTotals from '../components/checkout/checkoutTotals';
import Head from 'next/head';
import { UserContext } from '../store/UserContext';
import { decrementMealQtyDB } from '../utils/meals';
import { useRouter } from 'next/router';

const Checkout = () => {
	const { state } = useContext(UserContext);
	const { userCartlist } = state;
	const [msg, setMsg] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onPaymentClick = async () => {
		setLoading(true);
		//process payment
		for (const item of userCartlist) {
			const { prepperEmail, id, qty } = item;
			console.log(prepperEmail, id, qty);
			const data = await decrementMealQtyDB(prepperEmail, id, qty);
			if (data.message) {
				console.log('qty updated', data.message);
				setLoading(false);
				setMsg(data.message);
				setTimeout(() => {
					setMsg('');
					router.push('/confirmation');
				}, 5000);
			}
			if (data.error) {
				console.log('problem', data.error);
				setLoading(false);
				setError(data.error);
			}
			//add number of served to prepper trophy icon
			//clear userCartList
		}
	};

	return (
		<Box
			display='flex'
			width={'100%'}
			height='100vh'
			justifyContent={'space-evenly'}>
			<Head>
				<title>Checkout</title>
				<meta
					name='description'
					content='Checkout page. Confirm the meals, cost, and pay options before completing your order'
				/>
			</Head>
			{(msg || loading) && (
				<Alert
					color={loading ? 'warning' : 'success'}
					variant='filled'
					sx={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						fontSize: 'larger',
						textAlign: 'center',
						justifyContent: 'center',
						zIndex: 50,
					}}>
					<Typography fontSize={'3rem'}>
						{loading ? 'Processing payment...' : msg}
					</Typography>
				</Alert>
			)}
			{error && (
				<Alert
					color='error'
					variant='filled'
					sx={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						fontSize: 'larger',
						textAlign: 'center',
						justifyContent: 'center',
						zIndex: 99,
					}}>
					<Typography fontSize={'3rem'}>{error}</Typography>
				</Alert>
			)}
			<CheckoutList />
			<Divider />
			<CheckoutTotals loading={loading} onPaymentClick={onPaymentClick} />
		</Box>
	);
};

export default Checkout;
