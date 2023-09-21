import React from 'react';
import { Box, Paper, Typography, Button, Divider } from '@mui/material';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import { useColors } from '../../../../hooks/useColors';

const SignIn = () => {
	const { colors } = useColors();
	function handleSignInGoogle() {
		signIn('google');
	}

	const handleSignInCredentials = () => {
		signIn();
	};
	return (
		<Paper
			sx={{
				width: {
					xs: '100%',
					md: '45%'
				},
				height: {
					xs: '35vh',
					md: '50vh'
				},
				mt: {
					xs: '5em',
					md: '0'
				},
				boxShadow: 5,
				border: `2px solid ${colors.orangeAccent[900]}`,

				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				flexDirection: 'column'
			}}
		>
			<Box>
				<Typography variant="h1">Sign In Using</Typography>
			</Box>
			<Button
				onClick={handleSignInCredentials}
				size="large"
				sx={{ width: '250px', height: '50px' }}
				color="secondary"
				variant="contained"
			>
				Email and Password
			</Button>
			<Typography
				variant="h3"
				sx={{
					borderTop: `1px solid ${colors.orangeAccent[900]}`,
					width: '90%',
					textAlign: 'center'
				}}
			>
				or
			</Typography>
			<GoogleButton onClick={handleSignInGoogle}>
				Sign In With Google
			</GoogleButton>
		</Paper>
	);
};

export default SignIn;
