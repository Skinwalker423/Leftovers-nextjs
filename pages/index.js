import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
	Box,
	Typography,
	Input,
	Paper,
	IconButton,
	FormControl,
	InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSession } from 'next-auth/react';
import { useColors } from '../hooks/useColors';
import NavBar from '../components/global/NavBar';
import { mockDataContacts } from '../data/mockData';
import { useEffect, useContext, useState, useRef } from 'react';
import { ACTION_TYPES } from '../store/UserContext';
import { UserContext } from '../store/UserContext';
import CustomLoader from '../components/Loader';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';

export async function getServerSideProps(context) {
	const token = context.req.cookies['next-auth.session-token'];

	return {
		props: {
			mockDataContacts,
		},
	};
}

export default function Home() {
	const { colors } = useColors();
	const { data: session } = useSession();

	const handleZipSearch = (e) => {
		e.preventDefault();
		console.log('submitted');
	};

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
				<form onSubmit={handleZipSearch}>
					<FormControl>
						<InputLabel htmlFor='my-input'>Zip Code</InputLabel>
						<Box display={'flex'}>
							<Input id='my-input' aria-describedby='my-helper-text' />
							<IconButton type='submit'>S</IconButton>
						</Box>
					</FormControl>
				</form>
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
