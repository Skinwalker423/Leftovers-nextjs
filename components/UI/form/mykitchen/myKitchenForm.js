import React, { useRef, useState } from 'react';
import {
	Box,
	Paper,
	TextField,
	Typography,
	Button,
	CircularProgress,
	Alert,
} from '@mui/material';
import {
	isValidZipCode,
	validateEmail,
} from '../../../../utils/form-validation';
import { useRouter } from 'next/router';
import StateInput from '../registration/stateInput';

const MyKitchenForm = ({ title, sessionEmail }) => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [state, setState] = useState('');
	const [errorMsg, setErrorMsg] = useState();
	const [msg, setMsg] = useState();
	const router = useRouter();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const streetAddressRef = useRef();
	const cityRef = useRef();
	const zipcodeRef = useRef();
	const kitchenTitleRef = useRef();
	const descriptionRef = useRef();

	const handleRegistraionFormSubmit = async (e) => {
		e.preventDefault();
		console.log('registration pending');
		setIsFormLoading(true);
		setErrorMsg('');
		setMsg('');
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const email = sessionEmail;
		const zipcode = zipcodeRef.current.value;
		const description = descriptionRef.current.value;
		const kitchenTitle = kitchenTitleRef.current.value;

		const isValidZip = isValidZipCode(zipcode);
		const isValidEmail = validateEmail(email);

		if (!isValidZip) {
			setErrorMsg('Invalid zipcode');
			setIsFormLoading(false);
			return;
		}
		if (!isValidEmail) {
			setErrorMsg('Invalid email');
			setIsFormLoading(false);
			return;
		}

		if (!state) {
			setErrorMsg('please select a State');
			setIsFormLoading(false);

			return;
		}

		const formBody = {
			firstName,
			lastName,
			email,
			location: {
				address: streetAddressRef.current.value,
				city: cityRef.current.value,
				state: state,
				zipcode: zipcodeRef.current.value,
			},
			kitchenTitle,
			description,
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
				router.push('/myKitchen');
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
							id='title'
							type='text'
							label='Kitchen Name'
							required
							placeholder="Dana's Delightful Deserts"
							inputRef={kitchenTitleRef}
							color='secondary'
							fullWidth
						/>
					</Box>
					<Box width='100%' mt='1em'>
						<TextField
							minRows={3}
							multiline
							maxRows={3}
							required
							color='secondary'
							inputRef={descriptionRef}
							label='Description of your meals'
							placeholder='Enter a brief description of the types of meals you will prepare to share'
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
					{msg && (
						<Alert
							sx={{
								width: '100%',
								fontSize: 'larger',
								mt: '1.5em',
							}}
							severity='success'>
							{msg}
						</Alert>
					)}
					{errorMsg && (
						<Alert
							sx={{
								width: '100%',
								fontSize: 'larger',
								mt: '1.5em',
							}}
							severity='error'>
							{errorMsg}
						</Alert>
					)}
				</form>
			</Box>
		</Paper>
	);
};

export default MyKitchenForm;
