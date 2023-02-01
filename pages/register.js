import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import RegistrationForm from '../components/UI/form/registration/registrationForm';

const Register = () => {
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
			<RegistrationForm
				setErrorMsg={setErrorMsg}
				setMsg={setMsg}
				title={'Prepper Registration'}
			/>

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
