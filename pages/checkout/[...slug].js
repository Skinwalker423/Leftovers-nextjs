import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	connectMongoDb,
	findExistingPrepperEmail
} from '../../db/mongodb/mongoDbUtils';
import ErrorAlert from '../../components/UI/alert/ErrorAlert';

export async function getServerSideProps({ params }) {
	const prepperEmail = params.slug[1];
	const confirmationNumber = params.slug[0];
	console.log(prepperEmail);
	console.log(confirmationNumber);

	if (!prepperEmail || !confirmationNumber) {
		return {
			notFound: true
		};
	}

	try {
		const client = await connectMongoDb();
		const prepper = await findExistingPrepperEmail(client, prepperEmail);

		console.log(prepper);

		const orderDetails = {
			location: {
				address: prepper?.location.address,
				city: prepper?.location.city,
				state: prepper?.location.state,
				zipcode: prepper?.location.zipcode
			},
			confirmationNumber,
			prepperEmail
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
			</Box>
			{error?.length && <ErrorAlert errorMsg={error} setError={setErrorMsg} />}
		</Box>
	);
};

export default Directions;
