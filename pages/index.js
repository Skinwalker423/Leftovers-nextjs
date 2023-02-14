import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Alert, Box } from '@mui/material';
import Footer from '../components/layout/footer/footer';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';
import FavoriteList from '../components/favorites/favoriteList';
import { useColors } from '../hooks/useColors';
import CategoryBanner from '../components/category/categoryBanner';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchLocalPreppers } from '../utils/fetchLocalPreppers';
import LocalPreppersList from '../components/prepperLists/localPreppersList';
import FindLocalPreppersSearchBar from '../components/searchBar/findLocalPreppers';
import LandingHeader from '../components/layout/header/landingHeader';
import { isValidZipCode } from '../utils/form-validation';
import {
	connectMongoDb,
	findExistingUserEmail,
	addDocToDb,
} from '../db/mongodb/mongoDbUtils';
import { useSession } from 'next-auth/react';
import { UserContext } from '../store/UserContext';
import { ACTION_TYPES } from '../store/UserContext';

export async function getServerSideProps({ req, res }) {
	// const fetchedFavs = await fetchFavoritePreppers();
	const session = await unstable_getServerSession(req, res, authOptions);
	const foundSession = session ? session : null;
	console.log('this is the session:', session);
	const client = session && (await connectMongoDb());
	const user =
		session &&
		client &&
		(await findExistingUserEmail(client, session.user.email));

	if (!user && session) {
		const userDetails = {
			...session.user,
			favorites: [],
		};
		try {
			const doc = await addDocToDb(client, 'users', userDetails);
			return {
				props: {
					favoriteList: [],
					session: foundSession,
				},
			};
		} catch (err) {
			console.error('could not establish Google auth user');
			return {
				props: {
					favoriteList: [],
					session: foundSession,
					error: err,
				},
			};
		}
	}

	return {
		props: {
			favoriteList: session && user?.favorites ? user?.favorites : [],
			foundSession,
		},
	};
}

export default function Home({ favoriteList, foundSession, error }) {
	const [zipCode, setZipCode] = useState('');
	const [localPreppers, setLocalPreppers] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	const { colors } = useColors();
	const { data: session } = useSession();
	const { state, dispatch } = useContext(UserContext);

	const userEmail = foundSession?.user?.email || session?.user?.email;

	useEffect(() => {
		if (favoriteList) {
			dispatch({
				type: ACTION_TYPES.SET_FAVORITES_LIST,
				payload: favoriteList,
			});
		}
	}, []);

	console.log(state);

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
				{favoriteList.length && (foundSession || session) && (
					<CategoryBanner
						title='Favorite Preppers'
						bgColor={colors.blueAccent[700]}>
						<FavoriteList
							userEmail={userEmail}
							favoriteList={state.favorites}
						/>
					</CategoryBanner>
				)}
				{error && (
					<Alert
						sx={{
							width: '50%',
							fontSize: 'larger',
							mt: '5em',
						}}
						severity='error'>
						{error}
					</Alert>
				)}
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title='Leftovers' />
			</footer>
		</Box>
	);
}
