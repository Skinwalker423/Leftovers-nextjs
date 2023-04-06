import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Alert, Box } from '@mui/material';
import Footer from '../components/layout/footer/footer';
import FavoriteList from '../components/favorites/favoriteList';
import { useColors } from '../hooks/useColors';
import CategoryBanner from '../components/category/categoryBanner';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchLocalPreppers } from '../utils/fetchLocalPreppers';
import LocalPreppersList from '../components/prepperLists/localPreppersList';
import FindLocalPreppersSearchBar from '../components/searchBar/findLocalPreppers';
import LandingHeader from '../components/layout/header/landingHeader';
import { isValidZipCode } from '../utils/form-validation';
import ValueMealList from '../components/mealLists/valueMealList';
import {
	connectMongoDb,
	findExistingUserEmail,
	addDocToDb,
} from '../db/mongodb/mongoDbUtils';
import { useSession } from 'next-auth/react';
import { UserContext } from '../store/UserContext';
import { ACTION_TYPES } from '../store/UserContext';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);
	const foundSession = session
		? {
				name: session.user?.name || null,
				image: session.user?.image || null,
				email: session.user?.email || null,
		  }
		: null;
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

		if (findPreppers.error) {
			setErrorMsg(findPreppers.error);
		} else {
			dispatch({
				type: ACTION_TYPES.SET_LOCALPREPPERS_LIST,
				payload: findPreppers,
			});
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
			<header>
				<Box display={'flex'} justifyContent='center' alignItems={'center'}>
					<LandingHeader title='Welcome to Leftovers!' img='ball-park.jpg' />
					<FindLocalPreppersSearchBar
						handleZipChange={handleZipChange}
						handleZipSearchForm={handleZipSearchForm}
						errorMsg={errorMsg}
					/>
				</Box>
			</header>
			<main className={styles.main}>
				{state.localPreppers.length !== 0 && (
					<CategoryBanner
						link='/preppers'
						title='Local Preppers'
						bgColor={colors.orangeAccent[700]}>
						<LocalPreppersList />
					</CategoryBanner>
				)}
				{state.localPreppers.length !== 0 && (
					<CategoryBanner
						link='/'
						title='$5 Meals'
						bgColor={colors.greenAccent[700]}>
						<ValueMealList />
					</CategoryBanner>
				)}
				{state.favorites.length !== 0 && (foundSession || session) && (
					<CategoryBanner
						link='/favorites'
						title='Favorite Preppers'
						bgColor={colors.blueAccent[700]}>
						<FavoriteList userEmail={userEmail} />
					</CategoryBanner>
				)}
				{(error || errorMsg) && (
					<Alert
						sx={{
							width: '50%',
							fontSize: 'larger',
							mt: '5em',
						}}
						severity='error'>
						{error || errorMsg}
					</Alert>
				)}
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title='Leftovers' />
			</footer>
		</Box>
	);
}
