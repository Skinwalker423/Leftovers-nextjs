import React, { useState } from 'react';
import {
	Box,
	Paper,
	Typography,
	Button,
	Divider,
	TextField
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

	const handleSignInCredentials = (e) => {
		e.preventDefault();
		setLoading(true);
		signIn('credentials', {
			...data,
			redirect: false
		});
		setLoading(false);
		router.push('/');
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
					md: '50vh'
				},
				mt: {
					xs: '5em',
					md: '0'
				},
				px: { xs: 3, sm: 5, lg: 15 },
				py: { xs: 3 },
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
						sx={{ mt: 1, height: '4em' }}
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
			{/* <Box>
				<Typography variant="h1">Sign In Using</Typography>
			</Box>
			<Button
				onClick={handleSignInCredentials}
				size="large"
				sx={{ width: '250px', height: '50px' }}
				color="secondary"
				variant="contained"
			>
				Email and Password
			</Button> */}
			<Typography
				variant="h3"
				sx={{
					borderTop: `1px solid ${colors.orangeAccent[900]}`,
					width: '90%',
					textAlign: 'center',
					py: 1
				}}
			>
				or
			</Typography>
			<GoogleButton onClick={handleSignInGoogle}>
				Sign In With Google
			</GoogleButton>
		</Paper>
	);
};

export default SignIn;
