import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useColors } from '../hooks';
import NavBar from '../components/global/NavBar';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { mockDataContacts } from '../data/mockData';
import useTrackLocation from '../hooks/useTrackLocation';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../store/UserContext';

export async function getServerSideProps(context) {
	const token = context.req.cookies['next-auth.session-token'];

	return {
		props: {
			mockDataContacts,
		},
	};
}

export default function Home() {
	const { data: session } = useSession();
	const { colors } = useColors();

	const { state } = useContext(UserContext);
	console.log(state);

	const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
		useTrackLocation();
	useEffect(() => {
		handleTrackLocation();
	}, []);

	return (
		<Box className={styles.container}>
			<Head>
				<title>Leftovers</title>
				<meta name='description' content='The largest meal sharing app' />
			</Head>

			<main className={styles.main}>
				<NavBar />
				<Box className={styles.title}>
					<Typography
						variant='h1'
						lineHeight={1.15}
						fontSize='4rem'
						color={colors.orangeAccent[900]}>
						Welcome to Leftovers!
					</Typography>
				</Box>
				<p>The largest meal sharing app in the world</p>
				<Box>
					<Typography>{locationErrorMsg && locationErrorMsg}</Typography>
					<Typography>{state.latLong}</Typography>
				</Box>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer>
		</Box>
	);
}
