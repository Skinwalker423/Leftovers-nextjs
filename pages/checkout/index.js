import React, { useContext, useState } from 'react';
import { createOrder } from '../../utils/orders/createOrder';
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
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import useLocalStorage from '../../hooks/useLocalStorage';

export async function getServerSideProps({ req, res }) {
	try {
		const session = await getServerSession(req, res, authOptions);
		const foundSession = session
			? {
					name: session.user?.name || null,
					image: session.user?.image || null,
					email: session.user?.email || null
			  }
			: null;
		console.log('checking session:', foundSession);

		return {
			props: {
				foundSession
			}
		};
	} catch (err) {
		console.log('problem getting session', err);
		return {
			props: {
				foundSession,
				errorMsg: err
			}
		};
	}
}

const Checkout = ({ foundSession, errorMsg }) => {
	const { state, dispatch } = useContext(UserContext);
	const { userCartlist, cartTotalPrice } = state;
	const [msg, setMsg] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useLocalStorage('cartlist', userCartlist);

	const router = useRouter();
	const { colors } = useColors();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const dividerResponse = matches ? 'vertical' : 'horizontal';
	const userEmail = foundSession ? foundSession?.email : 'Guest';
	const prepEmail = userCartlist.length > 0 ? userCartlist[0].prepperEmail : '';
	console.log('email:', foundSession.email);

	console.log('prepperEmail', prepEmail);

	const onPaymentClick = async () => {
		if (userCartlist.length < 1) {
			setError('No items in cart');
			return;
		}
		setLoading(true);

		//process payment
		//add number of served to prepper trophy icon

		//create order in mongobd

		const order = {
			userEmail: userEmail,
			created_at: new Date(),
			items: userCartlist,
			total: cartTotalPrice,
			prepperEmail: userCartlist[0].prepperEmail
		};

		for (const item of userCartlist) {
			const { prepperEmail, id, qty } = item;

			if (prepperEmail !== prepEmail) {
				setError('Only items from one prepper is allowed per order');
				return;
			}
			try {
				const data = await decrementMealQtyDB(prepperEmail, id, qty);
				if (data.message) {
					console.log('qty updated', data.message);
				}
				if (data.error) {
					console.log('problem', data.error);
					setLoading(false);
					setError(data.error);
				}
			} catch (err) {
				setError(err);
				return;
			}
		}
		dispatch({ type: ACTION_TYPES.CLEAR_CARTLIST });
		dispatch({ type: ACTION_TYPES.SET_TOTAL_PRICE, payload: 0 });
		setValue('');
		setMsg('Payment complete. Redirecting to directions...');

		try {
			const orderDoc = await createOrder(order);
			if (orderDoc?.error) {
				setError('problem creating order:', orderDoc.error);
				return;
			}
			const orderId = orderDoc.data;
			console.log('order created in db', orderId);
			setLoading(false);
			window.location.href = `/checkout/${orderId}`;
		} catch (err) {
			setError('problem creating order:', err);
			return;
		}
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

			{(error || errorMsg) && (
				<ErrorAlert error={error || errorMsg} setError={setError} />
			)}
		</Box>
	);
};

export default Checkout;
