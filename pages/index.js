import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useColors } from '../hooks';
import NavBar from '../components/global/NavBar';
import FoodBankIcon from '@mui/icons-material/FoodBank';

export default function Home() {
	const { data: session } = useSession();
	const { colors } = useColors();
	console.log(session);

	return (
		<Box className={styles.container}>
			<Head>
				<title>Leftovers</title>
				<meta name='description' content='The largest food sharing app' />
			</Head>

			<main className={styles.main}>
				<NavBar />
				<h1 className={styles.title}>Welcome to Leftovers!</h1>
				<p>The largest food sharing app in the world</p>
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
