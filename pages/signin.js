import { getSession } from 'next-auth/react';
import React from 'react';
import { Box } from '@mui/material';
import SignIn from '../components/UI/form/auth/signin';
import SignUpForm from '../components/UI/form/auth/signup';
import Head from 'next/head';

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });
	console.log('checking session', session);

	if (session) {
		return {
			redirect: {
				destination: '/myKitchen',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

const signin = () => {
	return (
		<Box
			display={'flex'}
			justifyContent='center'
			alignItems={'center'}
			width='100%'
			height='100vh'>
			<Head>
				<title>Sign In</title>
				<meta
					name='description'
					content='Sign in using your email and password, or by signing in with Google'
				/>
			</Head>
			<Box
				width={'90%'}
				display={'flex'}
				justifyContent='space-around'
				alignItems={'center'}
				sx={{
					flexDirection: {
						sm: 'column',
						xs: 'column',
						md: 'row',
					},
				}}>
				<SignIn />
				<SignUpForm />
			</Box>
		</Box>
	);
};

export default signin;
