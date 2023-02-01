import React, { useRef, useState } from 'react';
import {
	Box,
	Paper,
	TextField,
	Typography,
	Button,
	CircularProgress,
} from '@mui/material';
import {
	isValidZipCode,
	validateEmail,
} from '../../../../utils/form-validation';
import { useRouter } from 'next/router';
import StateInput from './stateInput';

const RegistrationForm = ({ title, setErrorMsg, setMsg }) => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [state, setState] = useState('');
	const router = useRouter();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const streetAddressRef = useRef();
	const cityRef = useRef();
	const zipcodeRef = useRef();

	const handleRegistraionFormSubmit = async (e) => {
		e.preventDefault();
		console.log('registration pending');
		setIsFormLoading(true);
		setErrorMsg('');
		setMsg('');
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
				state: state,
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

			if (data.error) {
				setErrorMsg(data.error);
				setIsFormLoading(false);
			} else {
				router.push('/');
				setIsFormLoading(false);
				setMsg(data.message);
			}
		} catch (err) {
			setErrorMsg(err);
			setIsFormLoading(false);
		}
	};

	return (
		<Paper>
			<Typography pt={'1em'} textAlign='center' variant='h1'>
				{title}
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
						<StateInput state={state} setState={setState} />
						{/* <TextField
							id='state'
							type='text'
							label='State'
							required
							inputRef={stateRef}
							color='secondary'
							fullWidth
						/> */}
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
						sx={{ mt: '3rem', p: '1em' }}
						variant='contained'
						fullWidth
						disabled={isFormLoading}
						color='success'
						type='submit'
						required
						size='large'>
						{isFormLoading ? (
							<CircularProgress />
						) : (
							<Typography fontSize={'larger'} lineHeight={'2.5em'}>
								Submit
							</Typography>
						)}
					</Button>
				</form>
			</Box>
		</Paper>
	);
};

export default RegistrationForm;
