import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useColors } from '../hooks/useColors';
import NavBar from '../components/navbar/NavBar';
import { mockDataContacts } from '../data/mockData';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchLocalPreppers } from '../utils/fetchLocalPreppers';
import LocalPreppersList from '../components/prepperLists/localPreppersList';
import FindLocalPreppersSearchBar from '../components/searchBar/findLocalPreppers';
import LandingHeader from '../components/header/landingHeader';

export default function Home() {
	const [zipCode, setZipCode] = useState('');
	const [localPreppers, setLocalPreppers] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');

	const handleZipSearchForm = async (e) => {
		e.preventDefault();
		const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
		if (!isValidZip) {
			setErrorMsg('Invalid zip code');
			return;
		}
		console.log('submitted');
		setErrorMsg('');
		const findPreppers = await fetchLocalPreppers(zipCode);
		console.log(findPreppers);
		if (findPreppers.length !== 0) {
			setLocalPreppers(findPreppers);
		} else {
			setErrorMsg('could not find local preppers. Try another zip code');
		}
	};

	const handleZipChange = (e) => {
		const zip = e.target.value;
		setZipCode(zip);
	};

	return (
		<Box className={styles.container}>
			<Head>
				<title>Leftovers</title>
				<meta name='description' content='The largest meal sharing app' />
			</Head>
			<main className={styles.main}>
				<NavBar />
				<LandingHeader title='Welcome to Leftovers!' img='ball-park.jpg' />

				<FindLocalPreppersSearchBar
					handleZipChange={handleZipChange}
					handleZipSearchForm={handleZipSearchForm}
					errorMsg={errorMsg}
				/>
				<LocalPreppersList localPreppers={localPreppers} />
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
