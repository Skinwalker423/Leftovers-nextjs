import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Box, Typography } from '@mui/material';
import Footer from '../components/footer/footer';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';
import FavoriteList from '../components/favorites/favoriteList';
import { useColors } from '../hooks/useColors';
import CategoryBanner from '../components/category/categoryBanner';

import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchLocalPreppers } from '../utils/fetchLocalPreppers';
import LocalPreppersList from '../components/prepperLists/localPreppersList';
import FindLocalPreppersSearchBar from '../components/searchBar/findLocalPreppers';
import LandingHeader from '../components/header/landingHeader';
import { isValidZipCode } from '../utils/isValidZipCode';

export async function getServerSideProps() {
	const fetchedFavs = await fetchFavoritePreppers();

	return {
		props: {
			favoriteList: fetchedFavs ? fetchedFavs : [],
		},
	};
}

export default function Home({ favoriteList }) {
	const [zipCode, setZipCode] = useState('');
	const [localPreppers, setLocalPreppers] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	const { colors } = useColors();

	const handleZipSearchForm = async (e) => {
		e.preventDefault();
		const isValidZip = isValidZipCode(zipCode);
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
				<meta
					name='description'
					content='The largest meal sharing app in the world'
				/>
			</Head>
			<header className={styles.header}>
				<LandingHeader title='Welcome to Leftovers!' img='ball-park.jpg' />
				<FindLocalPreppersSearchBar
					handleZipChange={handleZipChange}
					handleZipSearchForm={handleZipSearchForm}
					errorMsg={errorMsg}
				/>
			</header>
			<main className={styles.main}>
				{localPreppers.length && (
					<CategoryBanner
						title='Local Preppers'
						bgColor={colors.orangeAccent[700]}>
						<LocalPreppersList localPreppers={localPreppers} />
					</CategoryBanner>
				)}
				{favoriteList.length && (
					<CategoryBanner
						title='Favorite Preppers'
						bgColor={colors.blueAccent[700]}>
						<FavoriteList favoriteList={favoriteList} />
					</CategoryBanner>
				)}
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title='Leftovers' />
			</footer>
		</Box>
	);
}
