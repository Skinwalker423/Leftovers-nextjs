import React from 'react';
import { getSession } from 'next-auth/react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });
	console.log({ session });

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	return {
		props: {
			userData: session,
		},
	};
}

const myKitchen = ({ userData }) => {
	const { name, email, image } = userData.user;
	return (
		<Box
			width='100%'
			height='100vh'
			display={'flex'}
			flexDirection='column'
			justifyContent='center'
			alignItems={'center'}>
			<Typography variant='h1'>{name}'s Kitchen</Typography>
			<Typography variant='h2'>{email}</Typography>
			<Typography variant='h3'>Pic</Typography>
			<Image
				alt={`avatar image of ${name}`}
				src={image}
				width={300}
				height={300}
			/>
		</Box>
	);
};

export default myKitchen;
