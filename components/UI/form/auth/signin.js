import React from 'react';
import { Box } from '@mui/material';
import { signIn } from 'next-auth/react';

const SignIn = () => {
	function handleSignIn() {
		signIn();
	}
	return (
		<Box>
			Sign In form <button onClick={handleSignIn}>Sign IN</button>
		</Box>
	);
};

export default SignIn;
