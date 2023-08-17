import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
	connectMongoDb,
	findExistingPrepperEmail,
	findOrderWithId
} from '../../db/mongodb/mongoDbUtils';
import ErrorAlert from '../../components/UI/alert/ErrorAlert';
import Map from '../../components/checkout/map';
import { Button } from '@mui/material';

export async function getServerSideProps({ params }) {
	const confirmationNumber = params.slug[0];
	console.log(confirmationNumber);

	if (!confirmationNumber) {
		return {
			notFound: true
		};
	}

	try {
		const client = await connectMongoDb();

		const order = await findOrderWithId(confirmationNumber);
		console.log('order with fake id', order);
		if (!order) {
			return {
				notFound: true
			};
		}

		const prepper = await findExistingPrepperEmail(client, order.prepperEmail);

		if (!prepper) {
			return {
				notFound: true
			};
		}

		console.log('found prepper in directions page SSR', prepper);

		const orderDetails = {
			location: {
				address: prepper?.location.address,
				city: prepper?.location.city,
				state: prepper?.location.state,
				zipcode: prepper?.location.zipcode
			},
			confirmationNumber,
			prepperEmail: order.prepperEmail
		};

		return {
			props: {
				orderDetails: orderDetails
			}
		};
	} catch (err) {
		console.log('problem getting order with id', err);
		return {
			notFound: true
		};
	}
}

const Directions = ({ orderDetails, error }) => {
	const [errorMsg, setErrorMsg] = useState('');
	if (!orderDetails)
		return <ErrorAlert error={'No order found'} setError={setErrorMsg} />;
	const queryAddress = orderDetails.location.address.replaceAll(' ', '%20');
	const query = `${queryAddress}%20${orderDetails.location.city}`;

	return (
		<Box
			width={'100%'}
			height={'100vh'}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Paper
				sx={{
					p: 5,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: 5
				}}
			>
				<Typography variant="h1">Thanks for your order!</Typography>
				<Box>
					<Typography fontSize={'large'} component="p">
						Confirmation Number:
					</Typography>
					<Typography component={'p'} fontSize={'x-large'} fontWeight={'bold'}>
						{orderDetails.confirmationNumber}
					</Typography>
				</Box>
				<Box>
					<Typography variant="h3">
						Pick up your meal at this address:
					</Typography>
					<Typography
						textAlign={'center'}
						fontWeight={'bold'}
						fontSize={'x-large'}
					>
						{orderDetails.location.address}
					</Typography>
					<Typography
						textAlign={'center'}
						fontWeight={'bold'}
						fontSize={'x-large'}
					>
						{orderDetails.location.city},{orderDetails.location.state},
						{orderDetails.location.zipcode}
					</Typography>
				</Box>
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${query}`}
					target="_blank"
				>
					<Button size="large" variant="contained" color="success">
						Get directions to your prepper
					</Button>
				</a>
				{/* <Map
					address={orderDetails.location.address}
					city={orderDetails.location.city}
				/> */}
			</Paper>
			{error?.length && (
				<ErrorAlert errorMsg={error || errorMsg} setError={setErrorMsg} />
			)}
		</Box>
	);
};

export default Directions;
