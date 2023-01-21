import React, { useState, useRef } from 'react';
import {
	Box,
	FormControl,
	Input,
	InputLabel,
	FormHelperText,
	Paper,
	TextField,
	FormGroup,
	Typography,
	Button,
} from '@mui/material';

const Register = () => {
	const [errorMsg, setErrorMsg] = useState('');
	const [msg, setMsg] = useState('');
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const streetAddressRef = useRef();
	const cityRef = useRef();
	const stateRef = useRef();
	const zipcodeRef = useRef();

	const handleRegistraionFormSubmit = async (e) => {
		e.preventDefault();
		console.log('registration submitted');
		const formBody = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			email: emailRef.current.value,
		};
		try {
			const response = await fetch('/api/register/prepper', {
				headers: {
					'Content-type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(formBody),
			});
			const data = await response.json();
			setMsg(data.message);
		} catch (err) {
			setErrorMsg(err);
		}
	};

	return (
		<Box
			width='100%'
			height='100vh'
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<Paper>
				<Typography textAlign='center' variant='h2'>
					Prepper Registration
				</Typography>
				<Box width={'600px'} height='500px' p='80px'>
					<form onSubmit={handleRegistraionFormSubmit}>
						<Box width={'100%'} display='flex' justifyContent={'space-between'}>
							<TextField
								type='text'
								required
								id='first-name'
								inputRef={firstNameRef}
								label='First Name'
								color='secondary'
								helperText={errorMsg && errorMsg}
							/>
							<TextField
								id='last-name'
								type='text'
								inputRef={lastNameRef}
								label='Last Name'
								color='secondary'
							/>
						</Box>
						<Box width='100%'>
							<TextField
								id='email'
								type='email'
								label='Email'
								inputRef={emailRef}
								color='secondary'
								fullWidth
							/>
						</Box>
						<Button
							sx={{ mt: '3rem' }}
							variant='outlined'
							fullWidth
							color='secondary'
							type='submit'
							size='large'>
							Submit
						</Button>
					</form>
				</Box>
			</Paper>
			{msg && <div>{msg}</div>}
		</Box>
	);
};

export default Register;
