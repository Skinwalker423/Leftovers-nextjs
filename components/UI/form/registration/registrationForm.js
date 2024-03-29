import React, { useRef, useState } from 'react';
import { registerPrepper, registerUser } from '../../../../utils/registration';
import {
	Box,
	Paper,
	TextField,
	Typography,
	Button,
	CircularProgress,
	useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	isValidZipCode,
	validateEmail
} from '../../../../utils/form-validation';
import StateInput from './stateInput';
import { signIn } from 'next-auth/react';

const RegistrationForm = ({ title, setErrorMsg, setMsg, sessionEmail }) => {
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [state, setState] = useState('');
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const streetAddressRef = useRef();
	const cityRef = useRef();
	const zipcodeRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const kitchenTitleRef = useRef();
	const descriptionRef = useRef();

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const handleRegistraionFormSubmit = async (e) => {
		e.preventDefault();

		setIsFormLoading(true);
		setErrorMsg('');
		setMsg('');
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const email = emailRef.current.value;
		const zipcode = zipcodeRef.current.value;
		const password = passwordRef.current.value;
		const confirmPassword = confirmPasswordRef.current.value;
		const description = descriptionRef.current.value;
		const kitchenTitle = kitchenTitleRef.current.value;

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
		if (password !== confirmPassword) {
			setErrorMsg('password does not match');
			return;
		}
		if (description.length > 240) {
			setErrorMsg('Description is more than 240 characters');
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
				zipcode: zipcodeRef.current.value
			},
			description,
			kitchenTitle
		};

		const userformBody = {
			email,
			password,
			confirmPassword
		};
		try {
			const data = await registerUser(userformBody);

			if (data.error) {
				setErrorMsg(data.error);
				setIsFormLoading(false);
				return;
			}
		} catch (err) {
			setErrorMsg(err);
			setIsFormLoading(false);
			return;
		}
		try {
			const data = await registerPrepper(formBody);

			if (data.error) {
				setErrorMsg(data.error);
				setIsFormLoading(false);
			} else {
				setIsFormLoading(false);
				setMsg(data.message);
				signIn();
			}
		} catch (err) {
			setErrorMsg(err);
			setIsFormLoading(false);
		}
	};

	return (
		<Paper
			sx={{
				width: { xs: '90%', sm: '85%', md: '50em' },
				height: { xs: '80vh', md: '89vh' },
				mt: '5rem'
			}}
		>
			<Typography py={'.5em'} textAlign="center" variant="h2">
				{title}
			</Typography>
			<Box width={'100%'} p={{ xs: '1em 2em', sm: '1em 5em' }}>
				<form onSubmit={handleRegistraionFormSubmit}>
					<Box
						gap={'1em'}
						width={'100%'}
						height={'100%'}
						display="flex"
						justifyContent={'space-between'}
					>
						<TextField
							size={matches ? 'medium' : 'small'}
							type="text"
							required
							id="first-name"
							inputRef={firstNameRef}
							label="First Name"
							color="secondary"
							fullWidth
						/>

						<TextField
							size={matches ? 'medium' : 'small'}
							id="last-name"
							type="text"
							required
							inputRef={lastNameRef}
							label="Last Name"
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							size={matches ? 'medium' : 'small'}
							id="email"
							type="email"
							label="Email"
							value={sessionEmail}
							autoComplete="username"
							required
							inputRef={emailRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							size={matches ? 'medium' : 'small'}
							id="title"
							type="text"
							label="Kitchen Name"
							required
							inputProps={{ maxLength: '50' }}
							placeholder="Dana's Delightful Deserts"
							inputRef={kitchenTitleRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box width={'100%'} mt="1em">
						<TextField
							size="medium"
							rows={3}
							fullWidth
							required
							multiline={matches ? true : false}
							inputRef={descriptionRef}
							inputProps={{ maxLength: '240' }}
							color="secondary"
							label="Description of your meals"
							placeholder="Enter a brief description of the types of meals you will prepare to share"
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							size={matches ? 'medium' : 'small'}
							id="address"
							type="text"
							label="Address"
							required
							inputRef={streetAddressRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box
						width="100%"
						display={'flex'}
						gap={2}
						flexDirection={'column'}
						mt="1em"
					>
						<TextField
							size={matches ? 'medium' : 'small'}
							id="city"
							type="text"
							label="City"
							required
							inputRef={cityRef}
							color="secondary"
							fullWidth
						/>
						<Box gap={2} display={'flex'}>
							<StateInput
								size={matches ? 'medium' : 'small'}
								state={state}
								setState={setState}
							/>

							<TextField
								size={matches ? 'medium' : 'small'}
								id="zipcode"
								type="number"
								inputProps={{ pattern: '[0-9]{5}', maxLength: 5 }}
								label="Zipcode"
								required
								inputRef={zipcodeRef}
								color="secondary"
								fullWidth
							/>
						</Box>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							size={matches ? 'medium' : 'small'}
							id="password"
							type="password"
							label="Password"
							required
							autoComplete="new-password"
							inputRef={passwordRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							size={matches ? 'medium' : 'small'}
							id="confirmPassword"
							type="password"
							label="Confirm Password"
							required
							autoComplete="new-password"
							inputRef={confirmPasswordRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Button
						sx={{ mt: '2rem', p: '1em' }}
						variant="contained"
						fullWidth
						disabled={isFormLoading}
						color="success"
						type="submit"
						required
						size="medium"
					>
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
