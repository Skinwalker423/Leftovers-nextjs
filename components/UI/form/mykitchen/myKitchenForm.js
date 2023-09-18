import React, { useRef, useState } from 'react';
import {
	Box,
	Paper,
	TextField,
	Typography,
	Button,
	CircularProgress,
	useTheme,
	useMediaQuery
} from '@mui/material';
import {
	isValidZipCode,
	validateEmail
} from '../../../../utils/form-validation';
import { useRouter } from 'next/router';
import StateInput from '../registration/stateInput';

const MyKitchenForm = ({ title, sessionEmail, setErrorMsg, setMsg }) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	const [isFormLoading, setIsFormLoading] = useState(false);
	const [state, setState] = useState('');
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
				zipcode: zipcodeRef.current.value
			},
			kitchenTitle,
			description
		};
		try {
			const response = await fetch('/api/register/prepper', {
				headers: {
					'Content-type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(formBody)
			});
			const data = await response.json();

			if (data.error) {
				setErrorMsg(data.error);
				setIsFormLoading(false);
			} else {
				setIsFormLoading(false);
				setMsg(data.message);
				router.push('/');
			}
		} catch (err) {
			setErrorMsg(err);
			setIsFormLoading(false);
		}
	};

	return (
		<Paper sx={{ py: '2em', m: '1em' }}>
			<Typography textAlign="center" variant="h1">
				{title}
			</Typography>
			<Box width={'100%'} p="2em 4em">
				<form onSubmit={handleRegistraionFormSubmit}>
					<Box
						gap={2}
						width={'100%'}
						display="flex"
						justifyContent={'space-between'}
					>
						<TextField
							size={matches ? 'medium' : 'small'}
							type="text"
							required
							fullWidth
							id="first-name"
							inputRef={firstNameRef}
							label="First Name"
							color="secondary"
						/>
						<TextField
							size={matches ? 'medium' : 'small'}
							id="last-name"
							type="text"
							required
							fullWidth
							inputRef={lastNameRef}
							label="Last Name"
							color="secondary"
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							size={matches ? 'medium' : 'small'}
							id="title"
							type="text"
							label="Kitchen Name"
							required
							placeholder="Dana's Delightful Deserts"
							inputRef={kitchenTitleRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							size="medium"
							rows={3}
							fullWidth
							multiline={matches ? true : false}
							required
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
						flexDirection={{ xs: 'column' }}
						gap={2}
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
						<Box display={'flex'} gap={2}>
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
					<Button
						sx={{ mt: '3rem', p: '1em' }}
						variant="contained"
						fullWidth
						disabled={isFormLoading}
						color="success"
						type="submit"
						required
						size="large"
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

export default MyKitchenForm;
