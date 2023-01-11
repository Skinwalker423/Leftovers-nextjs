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
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();

	const handleRegistraionFormSubmit = (e) => {
		e.preventDefault();
		console.log('registration submitted');
		console.log(firstNameRef.current.value);
		console.log(lastNameRef.current.value);
		console.log(emailRef.current.value);
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
								id='first-name'
								inputRef={firstNameRef}
								label='First Name'
								color='secondary'
								helperText={errorMsg && errorMsg}
								error={errorMsg}
							/>
							<TextField
								id='last-name'
								type='text'
								inputRef={lastNameRef}
								label='Last Name'
								color='secondary'
								helperText={'error'}
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
								helperText={'error'}
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
		</Box>
	);
};

export default Register;
