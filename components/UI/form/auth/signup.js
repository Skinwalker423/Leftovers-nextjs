import React, { useRef, useState } from 'react';
import {
	Box,
	Paper,
	TextField,
	Typography,
	Button,
	Alert
} from '@mui/material';
import { validateEmail } from '../../../../utils/form-validation';
import { useColors } from '../../../../hooks/useColors';
import CircularProgress from '@mui/material/CircularProgress';
import { signIn } from 'next-auth/react';

const SignUpForm = () => {
	const { colors } = useColors();
	const [errorMsg, setErrorMsg] = useState('');
	const [msg, setMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const handleSignUpFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg('');
		setMsg('');
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const confirmPassword = confirmPasswordRef.current.value;

		if (password !== confirmPassword) {
			setErrorMsg('password does not match');
			setLoading(false);
			return;
		}

		const isValidEmail = validateEmail(email);

		if (!isValidEmail) {
			setErrorMsg('Invalid email');
			setLoading(false);
			return;
		}

		const formBody = {
			email,
			password,
			confirmPassword
		};
		try {
			const response = await fetch('/api/register/user', {
				headers: {
					'Content-type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(formBody)
			});
			const data = await response.json();

			if (data.error) {
				setErrorMsg(data.error);
				setLoading(false);
			} else {
				setMsg(data.message);
				setTimeout(() => {
					setLoading(false);
					signIn();
				}, 1000);
			}
		} catch (err) {
			setErrorMsg(err.message);
			setLoading(false);
		}
	};

	return (
		<Paper
			sx={{
				width: {
					xs: '100%',
					md: '45%',
					lg: '40%',
					xl: '35%'
				},

				boxShadow: 5,
				border: `2px solid ${colors.orangeAccent[900]}`,
				mb: 5,
				py: '2rem'
			}}
		>
			<Typography textAlign="center" variant="h2">
				Sign Up
			</Typography>
			<Box
				width={'100%'}
				sx={{
					px: {
						xs: '2em',
						md: '5em'
					}
				}}
			>
				<form onSubmit={handleSignUpFormSubmit}>
					<Box width="100%" mt="1em">
						<TextField
							id="email"
							type="email"
							label="Email"
							required
							autoComplete="on"
							inputRef={emailRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							id="password"
							type="password"
							label="Password"
							required
							autoComplete="on"
							inputRef={passwordRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box width="100%" mt="1em">
						<TextField
							id="confirmPassword"
							type="password"
							label="Confirm Password"
							required
							autoComplete="on"
							inputRef={confirmPasswordRef}
							color="secondary"
							fullWidth
						/>
					</Box>
					<Box pt={5}>
						<Button
							sx={{ height: '4em' }}
							variant="contained"
							fullWidth
							color="success"
							type="submit"
							required
							size="large"
							disabled={loading}
						>
							<Typography fontSize={'large'}>
								{loading ? (
									<CircularProgress color="primary" size={'1.75rem'} />
								) : (
									'Submit'
								)}
							</Typography>
						</Button>
					</Box>
				</form>
			</Box>
			<Box
				display={'flex'}
				width={'100%'}
				justifyContent="center"
				alignItems="center"
				px={3}
			>
				{msg && (
					<Alert
						onClose={() => setMsg('')}
						sx={{
							width: '100%',
							fontSize: 'larger',
							mt: 3
						}}
						severity="success"
					>
						{msg}
					</Alert>
				)}
				{errorMsg && (
					<Alert
						onClose={() => setErrorMsg('')}
						sx={{
							width: '100%',
							fontSize: 'larger',
							mt: 3
						}}
						severity="error"
					>
						{errorMsg}
					</Alert>
				)}
			</Box>
		</Paper>
	);
};

export default SignUpForm;
