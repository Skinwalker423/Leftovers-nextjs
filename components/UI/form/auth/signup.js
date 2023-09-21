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
import { signIn } from 'next-auth/react';
import { useColors } from '../../../../hooks/useColors';
import CircularProgress from '@mui/material/CircularProgress';

const SignUpForm = ({ title }) => {
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
			email: emailRef.current.value,
			password: passwordRef.current.value,
			confirmPassword: confirmPasswordRef.current.value
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
				signIn();
			}
		} catch (err) {
			setErrorMsg(err);
			setLoading(false);
		}
	};

	return (
		<Paper
			sx={{
				width: {
					xs: '100%',
					md: '45%'
				},
				height: {
					xs: '45vh',
					sm: '50vh'
				},

				boxShadow: 5,
				border: `2px solid ${colors.orangeAccent[900]}`
			}}
		>
			<Typography pt={'.5em'} textAlign="center" variant="h1">
				Sign Up
			</Typography>
			<Box
				width={'100%'}
				sx={{
					px: {
						xs: '2em',
						md: '5em',
						lg: '8em'
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
					<Box>
						<Button
							sx={{ mt: '3rem', height: '4em' }}
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
				mt="3em"
			>
				{msg && (
					<Alert
						sx={{
							width: '50%',
							fontSize: 'larger'
						}}
						severity="success"
					>
						{msg}
					</Alert>
				)}
				{errorMsg && (
					<Alert
						sx={{
							width: '50%',
							fontSize: 'larger'
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
