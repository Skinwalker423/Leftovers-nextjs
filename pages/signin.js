import { getSession } from 'next-auth/react';
import React from 'react';
import { Box } from '@mui/material';
import SignIn from '../components/UI/form/auth/signin';

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });

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
			<Box>
				<SignIn />
			</Box>
		</Box>
	);
};

export default signin;
