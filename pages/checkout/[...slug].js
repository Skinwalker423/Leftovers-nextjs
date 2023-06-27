import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	connectMongoDb,
	findExistingPrepperEmail,
	findOrderWithId
} from '../../db/mongodb/mongoDbUtils';
import ErrorAlert from '../../components/UI/alert/ErrorAlert';
import Map from '../../components/checkout/map';

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

		const prepper = await findExistingPrepperEmail(client, order.prepperEmail);

		if (!order || !prepper) {
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
		return {
			props: {
				error: err
			}
		};
	}
}

const Directions = ({ orderDetails, error }) => {
	const [errorMsg, setErrorMsg] = useState('');
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
			<Typography variant="h1">Thanks for your order!</Typography>
			<Typography component="p">
				Here is your confirmation number: {orderDetails.confirmationNumber}
			</Typography>
			<Box>
				<Typography variant="h3">
					Here are the directions to for your local prepper to pick up your meal
				</Typography>
				<Typography variant="h5">{orderDetails.location.address}</Typography>
				<Typography variant="h5">
					{orderDetails.location.city},{orderDetails.location.state},
					{orderDetails.location.zipcode}
				</Typography>
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${query}`}
					target="_blank"
				>
					Get directions to your prepper
				</a>
				{/* <Map
					address={orderDetails.location.address}
					city={orderDetails.location.city}
				/> */}
			</Box>
			{error?.length && <ErrorAlert errorMsg={error} setError={setErrorMsg} />}
		</Box>
	);
};

export default Directions;
