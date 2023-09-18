import { getSession } from 'next-auth/react';
import React from 'react';
import {
	Box,
	Divider,
	Grid,
	GridItem,
	useTheme,
	useMediaQuery
} from '@mui/material';
import SignIn from '../components/UI/form/auth/signin';
import SignUpForm from '../components/UI/form/auth/signup';
import Head from 'next/head';

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}

const signin = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const dividerResponse = matches ? 'vertical' : 'horizontal';

	return (
		<Box
			sx={{ backgroundImage: 'url("./art.jpg")', backgroundSize: 'cover' }}
			display={'flex'}
			justifyContent="center"
			alignItems={'center'}
			width="100%"
			height="100vh"
		>
			<Head>
				<title>Sign In</title>
				<meta
					name="description"
					content="Sign in using your email and password, or by signing in with Google"
				/>
			</Head>
			<Box
				width={{ xs: '85%', sm: '70%', md: '90%' }}
				display={'flex'}
				height={{ xs: '95vh', md: '100vh' }}
				justifyContent="space-around"
				alignItems={'center'}
				sx={{
					flexDirection: {
						xs: 'column',
						md: 'row'
					}
				}}
			>
				<SignIn />

				<Divider
					sx={{ p: '1em' }}
					orientation={dividerResponse}
					flexItem
					light={true}
					style={{
						fontSize: 'large',
						fontWeight: 'bold'
					}}
				>
					OR
				</Divider>

				<SignUpForm />
			</Box>
		</Box>
	);
};

export default signin;
