import React, { useState } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Box, Typography, Alert } from '@mui/material';
import Image from 'next/image';
import MyKitchenForm from '../components/UI/form/mykitchen/myKitchenForm';
import RegistrationForm from '../components/UI/form/registration/registrationForm';
import AddMeal from '../components/UI/form/mykitchen/addMeal';
import DefaultAvatar from '../components/UI/icon/defaultAvatar';
import {
	connectMongoDb,
	findExistingPrepperEmail,
} from '../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res }) {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	const client = await connectMongoDb();
	const userDb = await findExistingPrepperEmail(client, session.user.email);

	return {
		props: {
			userData: session.user,
			prepper: userDb,
		},
	};
}

const myKitchen = ({ userData, prepper }) => {
	console.log(prepper);
	const { name = 'User', email, image } = userData;
	return (
		<Box
			width='100%'
			height={'100vh'}
			display={'flex'}
			flexDirection='row'
			justifyContent='space-around'
			alignItems={'center'}>
			<Box>
				{image ? (
					<Image
						alt={`avatar image of ${name}`}
						src={image}
						width={100}
						height={100}
						priority
					/>
				) : (
					<DefaultAvatar
						userEmail={prepper.name}
						widthHeight={100}
						fontSize='3em'
					/>
				)}
				<Typography variant='h1'>{prepper.kitchenTitle}</Typography>
				<Typography variant='h2'>{email}</Typography>
				<Typography variant='h3'>{prepper.description}</Typography>
				<Typography variant='h3'>{prepper.name}</Typography>
				<Typography variant='h3'>
					state: {prepper ? prepper.location.state : ''}
				</Typography>
				<Typography variant='h3'>
					zipcode: {prepper ? prepper.location.zipcode : ''}
				</Typography>

				<AddMeal />
			</Box>
			{!prepper && (
				<MyKitchenForm sessionEmail={email} title='Register Kitchen' />
			)}
		</Box>
	);
};

export default myKitchen;
