import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import SignIn from '../components/UI/form/auth/signin';
import SignUpForm from '../components/UI/form/auth/signup';
import Head from 'next/head';
import { useColors } from '../hooks/useColors';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);

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
	const { colors } = useColors();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const dividerResponse = matches ? 'column' : 'row';

	return (
		<Box
			sx={{ backgroundImage: 'url("./art.jpg")', backgroundSize: 'cover' }}
			display={'flex'}
			justifyContent="center"
			alignItems={'flex-start'}
			width="100%"
			minHeight={'100vh'}
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
				height={'100%'}
				justifyContent="space-around"
				alignItems={'flex-start'}
				sx={{
					flexDirection: {
						xs: 'column',
						md: 'row'
					}
				}}
			>
				<SignIn />

				<Box
					width={dividerResponse === 'row' ? '100%' : '1px'}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={1}
					flexDirection={dividerResponse}
					py={2}
				>
					<Box
						width={'100%'}
						bgcolor={colors.orangeAccent[400]}
						height={dividerResponse === 'row' ? '1px' : '20em'}
					/>
					<Typography color={'primary'} variant="h4">
						OR
					</Typography>
					<Box
						width={'100%'}
						bgcolor={colors.orangeAccent[400]}
						height={dividerResponse === 'row' ? '1px' : '20em'}
					/>
				</Box>

				<SignUpForm />
			</Box>
		</Box>
	);
};

export default signin;
