import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import MyKitchenForm from '../components/UI/form/mykitchen/myKitchenForm';
import SuccessAlert from '../components/UI/alert/successAlert';
import ErrorAlert from '../components/UI/alert/ErrorAlert';
import Head from 'next/head';
import {
	connectMongoDb,
	findExistingPrepperEmail
} from '../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res }) {
	try {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return {
				redirect: {
					destination: '/signin',
					permanent: false
				}
			};
		}

		//redirect if user has not verified email

		const userSession = {
			name: session.user?.name || null,
			image: session.user?.image || null,
			email: session.user?.email || null,
			isVerified: session.user?.isVerified || false
		};

		const client = await connectMongoDb();
		const prepperDb = await findExistingPrepperEmail(client, userSession.email);

		if (prepperDb) {
			return {
				redirect: {
					destination: '/myKitchen',
					permanent: false
				}
			};
		}

		return {
			props: {
				userSession
			}
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				error,
				userSession
			}
		};
	}
}

const Register = ({ userSession, error }) => {
	const [errorMsg, setErrorMsg] = useState('');
	const [msg, setMsg] = useState('');

	if (error) {
		setErrorMsg(error);
	}

	return (
		<Box
			sx={{ backgroundImage: 'url("./art.jpg")', backgroundSize: 'cover' }}
			width="100%"
			height="100vh"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>
			<Head>
				<title>Register</title>
				<meta
					name="description"
					content="Register your kitchen to begin prepping meals for your community and sharing your unique homemade meals through the largest meal sharing app in the world"
				/>
			</Head>
			{userSession && (
				<MyKitchenForm
					title={'Prepper Registration'}
					sessionEmail={userSession.email}
					setErrorMsg={setErrorMsg}
					setMsg={setMsg}
				/>
			)}

			{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
			{errorMsg && <ErrorAlert error={errorMsg} setError={setErrorMsg} />}
		</Box>
	);
};

export default Register;
