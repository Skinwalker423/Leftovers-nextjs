import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import { useColors } from '../../../../hooks/useColors';

const SignIn = () => {
	const { colors } = useColors();
	function handleSignIn() {
		signIn('google');
	}
	return (
		<Paper
			sx={{
				width: {
					xs: '100%',
					md: '47%',
				},
				height: {
					xs: '35vh',
				},
				mt: {
					xs: '5em',
				},

				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<Box>
				<Typography variant='h1'>Sign In Using</Typography>
			</Box>
			<Button size='large' color='secondary' variant='contained'>
				Email and Password
			</Button>
			<Typography variant='h3'>or</Typography>
			<GoogleButton onClick={handleSignIn}>Sign In With Google</GoogleButton>
		</Paper>
	);
};

export default SignIn;
