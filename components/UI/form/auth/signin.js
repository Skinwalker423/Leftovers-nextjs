import React, { useState } from 'react';
import {
	Box,
	Paper,
	Typography,
	Button,
	Divider,
	TextField,
	CircularProgress,
	Alert
} from '@mui/material';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import { useColors } from '../../../../hooks/useColors';
import { useRouter } from 'next/router';

const SignIn = () => {
	const [data, setData] = useState({
		email: '',
		password: ''
	});

	const [error, setError] = useState('');

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { colors } = useColors();
	function handleSignInGoogle() {
		signIn('google');
	}

	const handleEmailChange = (e) => {
		setData((prevData) => {
			return {
				...prevData,
				email: e.target.value
			};
		});
	};
	const handlePasswordChange = (e) => {
		setData((prevData) => {
			return {
				...prevData,
				password: e.target.value
			};
		});
	};

	const handleSignInCredentials = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await signIn('credentials', {
				...data,
				redirect: false
			});

			console.log('response from bad sign in', res);

			if (!res.error) {
				router.push('/');
				setLoading(false);
			} else {
				setError('invalid email/password');
				setLoading(false);
			}
		} catch (error) {
			setError('problem signing in. Try again');
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
					xs: '100%',
					md: '50vh'
				},

				px: { xs: 3, sm: 5, lg: 15 },
				py: { xs: 3 },
				mt: { xs: 5, sm: 0 },
				boxShadow: 5,
				border: `2px solid ${colors.orangeAccent[900]}`,

				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				flexDirection: 'column'
			}}
		>
			<Typography textAlign="center" variant="h1">
				Sign In with Email
			</Typography>
			<form style={{ width: '100%' }} onSubmit={handleSignInCredentials}>
				<Box width="100%" mt="1em">
					<TextField
						id="signin-email"
						type="email"
						label="Email"
						required
						autoComplete="on"
						onChange={handleEmailChange}
						value={data.email}
						color="secondary"
						fullWidth
					/>
				</Box>
				<Box width="100%" mt="1em">
					<TextField
						id="signin-password"
						type="password"
						label="Password"
						required
						autoComplete="on"
						onChange={handlePasswordChange}
						value={data.password}
						color="secondary"
						fullWidth
					/>
				</Box>

				<Box>
					<Button
						sx={{ my: 2, height: '4em' }}
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
					{error && (
						<Alert
							onClose={() => {
								setError('');
							}}
							color="error"
							severity="error"
							variant="filled"
							sx={{
								bottom: 0,
								width: '100%',
								fontSize: 'larger',
								textAlign: 'center',
								justifyContent: 'center',
								zIndex: 150
							}}
						>
							{error}
						</Alert>
					)}
				</Box>
			</form>
			<Box
				width={'100%'}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				gap={1}
				py={2}
			>
				<Box width={'100%'} bgcolor={colors.orangeAccent[800]} height={'1px'} />
				<Typography>or</Typography>
				<Box width={'100%'} bgcolor={colors.orangeAccent[800]} height={'1px'} />
			</Box>
			<GoogleButton onClick={handleSignInGoogle}>
				Sign In With Google
			</GoogleButton>
		</Paper>
	);
};

export default SignIn;
