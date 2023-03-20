import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import RegistrationForm from '../components/UI/form/registration/registrationForm';
import MyKitchenForm from '../components/UI/form/mykitchen/myKitchenForm';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);
	const userSession = session ? session : null;

	return {
		props: {
			userSession,
		},
	};
}

const Register = ({ userSession }) => {
	const [errorMsg, setErrorMsg] = useState('');
	const [msg, setMsg] = useState('');

	return (
		<Box
			width='100%'
			height='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			{userSession ? (
				<MyKitchenForm
					title={'Prepper Registration'}
					sessionEmail={userSession?.user?.email}
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
						width: '50%',
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
						width: '50%',
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
