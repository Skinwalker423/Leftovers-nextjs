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
import { isValidZipCode, validateEmail } from '../utils/form-validation';

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
		console.log('registration pending');
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const email = emailRef.current.value;
		const zipcode = zipcodeRef.current.value;

		const isValidZip = isValidZipCode(zipcode);
		const isValidEmail = validateEmail(email);

		if (!isValidZip) {
			setErrorMsg('Invalid zipcode');
			return;
		}
		if (!isValidEmail) {
			setErrorMsg('Invalid email');
			return;
		}

		const formBody = {
			firstName,
			lastName,
			email: emailRef.current.value,
			location: {
				address: streetAddressRef.current.value,
				city: cityRef.current.value,
				state: stateRef.current.value,
				zipcode: zipcodeRef.current.value,
			},
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
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			<Paper>
				<Typography pt={'1em'} textAlign='center' variant='h1'>
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
								required
								inputRef={lastNameRef}
								label='Last Name'
								color='secondary'
							/>
						</Box>
						<Box width='100%' mt='1em'>
							<TextField
								id='email'
								type='email'
								label='Email'
								required
								inputRef={emailRef}
								color='secondary'
								fullWidth
							/>
						</Box>
						<Box width='100%' mt='1em'>
							<TextField
								id='address'
								type='text'
								label='Address'
								required
								inputRef={streetAddressRef}
								color='secondary'
								fullWidth
							/>
						</Box>
						<Box width='100%' display={'flex'} mt='1em'>
							<TextField
								id='city'
								type='text'
								label='City'
								required
								inputRef={cityRef}
								color='secondary'
								fullWidth
							/>
							<TextField
								id='state'
								type='text'
								label='State'
								required
								inputRef={stateRef}
								color='secondary'
								fullWidth
							/>
							<TextField
								id='zipcode'
								type='number'
								inputProps={{ pattern: '[0-9]{5}', maxLength: 5 }}
								label='Zipcode'
								required
								inputRef={zipcodeRef}
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
							required
							size='large'>
							Submit
						</Button>
					</form>
				</Box>
			</Paper>
			{msg && <div>{msg}</div>}
			{errorMsg && <div>{errorMsg}</div>}
		</Box>
	);
};

export default Register;
