import { getSession } from 'next-auth/react';
import React from 'react';
import {
	Box,
	Divider,
	Grid,
	GridItem,
	useTheme,
	useMediaQuery,
	Typography
} from '@mui/material';
import SignIn from '../components/UI/form/auth/signin';
import SignUpForm from '../components/UI/form/auth/signup';
import Head from 'next/head';
import { useColors } from '../hooks/useColors';

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
	const { colors } = useColors();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const dividerResponse = matches ? 'column' : 'row';

	return (
		<Box
			sx={{ backgroundImage: 'url("./art.jpg")', backgroundSize: 'cover' }}
			display={'flex'}
			justifyContent="center"
			alignItems={'center'}
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
				alignItems={'center'}
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
