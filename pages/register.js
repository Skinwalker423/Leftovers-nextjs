import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import RegistrationForm from '../components/UI/form/registration/registrationForm';
import MyKitchenForm from '../components/UI/form/mykitchen/myKitchenForm';
import Head from 'next/head';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);
	const userSession = session
		? {
				name: session.user?.name || null,
				image: session.user?.image || null,
				email: session.user?.email || null,
		  }
		: null;

	return {
		props: {
			userSession,
		},
	};
}

const Register = ({ userSession }) => {
	const [errorMsg, setErrorMsg] = useState('');
	const [msg, setMsg] = useState('');
	console.log(userSession);

	return (
		<Box
			width='100%'
			height='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			<Head>
				<title>Register</title>
				<meta
					name='description'
					content='Register your kitchen to begin prepping meals for your community and sharing your unique homemade meals through the largest meal sharing app in the world'
				/>
			</Head>
			{userSession ? (
				<MyKitchenForm
					title={'Prepper Registration'}
					sessionEmail={userSession?.email}
				/>
			) : (
				<RegistrationForm
					setErrorMsg={setErrorMsg}
					setMsg={setMsg}
					title={'Prepper Registration'}
				/>
			)}

			{msg && (
				<Alert
					sx={{
						position: 'absolute',
						bottom: '0',
						width: '60%',
						textAlign: 'center',
						fontSize: 'larger',
						mt: '5em',
					}}
					severity='success'>
					{msg}
				</Alert>
			)}
			{errorMsg && (
				<Alert
					sx={{
						position: 'absolute',
						bottom: '0',
						width: '60%',
						fontSize: 'larger',
						mt: '5em',
					}}
					severity='error'>
					{errorMsg}
				</Alert>
			)}
		</Box>
	);
};

export default Register;
