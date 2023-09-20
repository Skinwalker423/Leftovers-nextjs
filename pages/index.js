import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import Footer from '../components/layout/footer/footer';
import { useColors } from '../hooks/useColors';
import CategoryBanner from '../components/category/categoryBanner';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchLocalPreppers } from '../utils/fetchLocalPreppers';
import LocalPreppersList from '../components/prepperLists/localPreppersList';
import LandingHeader from '../components/layout/header/landingHeader';
import { isValidZipCode } from '../utils/form-validation';
import SuccessAlert from '../components/UI/alert/successAlert';
import ErrorAlert from '../components/UI/alert/ErrorAlert';
import ValueMealList from '../components/mealLists/valueMealList';
import {
	connectMongoDb,
	findExistingUserEmail
} from '../db/mongodb/mongoDbUtils';
import { useSession } from 'next-auth/react';
import { UserContext } from '../store/UserContext';
import { ACTION_TYPES } from '../store/UserContext';
import LandingCardList from '../components/landingPagePromos/LandingCardList';
import PromoSection from '../components/landingPagePromos/promoSection';
import CustomLoader from '../components/UI/Loader';
import FavoriteList from '../components/prepperLists/favoriteList';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);

	const client = session && (await connectMongoDb());
	const user =
		session &&
		client &&
		(await findExistingUserEmail(client, session.user.email));

	console.log('user in SSR', user);

	const foundSession = session
		? {
				name: session.user?.name || null,
				image: session.user?.image || null,
				email: session.user?.email || null,
				zipcode: user?.zipcode || null,
				favorites: user?.favorites || []
		  }
		: null;

	return {
		props: {
			favoriteList: session && user?.favorites ? user?.favorites : [],
			foundSession
		}
	};
}

export default function Home({ favoriteList, foundSession, errorServer }) {
	const [zipCode, setZipCode] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [msg, setMsg] = useState('');
	const { colors } = useColors();
	const { data: session } = useSession();
	const { state, dispatch, setFavoritesList, setDefaultZipcode } =
		useContext(UserContext);

	const userEmail = foundSession?.user?.email || session?.user?.email;
	const defaultZipcode = foundSession?.user?.zipcode;

	console.log('user zipcode', defaultZipcode);
	console.log('user state', state);

	useEffect(() => {
		if (favoriteList) {
			setFavoritesList(favoriteList);
		}

		if (defaultZipcode) {
			setDefaultZipcode(defaultZipcode);
		}
	}, []);

	const handleZipSearchForm = async (e) => {
		e.preventDefault();
		setIsSearching(true);
		const isValidZip = isValidZipCode(zipCode);
		if (!isValidZip) {
			setErrorMsg('Invalid zip code');
			setIsSearching(false);
			setTimeout(() => {
				setErrorMsg('');
			}, 5000);
			return;
		}

		setErrorMsg('');
		const findPreppers = await fetchLocalPreppers(zipCode);

		if (findPreppers.error) {
			setIsSearching(false);
			setErrorMsg(findPreppers.error);
			setTimeout(() => {
				setErrorMsg('');
			}, 5000);
		} else {
			dispatch({
				type: ACTION_TYPES.SET_LOCALPREPPERS_LIST,
				payload: findPreppers
			});
			setIsSearching(false);
			setZipCode('');
			if (findPreppers.length) {
				const results = document.getElementById('searchResults');
				results.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
			}
		}
	};

	const handleZipChange = (e) => {
		const zip = e.target.value;
		setZipCode(zip);
	};

	return (
		<Box
			width={'100%'}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
		>
			<Head>
				<title>Leftovers</title>
				<meta
					name="description"
					content="The largest meal sharing app in the world"
				/>
			</Head>
			<Box>
				<LandingHeader
					title="Welcome to Leftovers!"
					img="/ball-park.jpg"
					handleZipChange={handleZipChange}
					handleZipSearchForm={handleZipSearchForm}
					errorMsg={errorMsg}
					zipCode={zipCode}
				/>
				<div id="searchResults" />
				{state.localPreppers.length !== 0 && (
					<CategoryBanner
						link="/preppers"
						title="Local Preppers"
						bgColor={colors.orangeAccent[700]}
					>
						<LocalPreppersList
							setMsg={setMsg}
							setErrorMsg={setErrorMsg}
							userEmail={userEmail}
						/>
					</CategoryBanner>
				)}

				{state.localPreppers.length !== 0 && (
					<CategoryBanner
						link="/"
						title="$5 Meals"
						bgColor={colors.greenAccent[700]}
					>
						<ValueMealList userEmail={userEmail} setMsg={setMsg} />
					</CategoryBanner>
				)}
				{state.favorites.length !== 0 && (foundSession || session) && (
					<CategoryBanner
						link="/favorites"
						title="Favorite Preppers"
						bgColor={colors.blueAccent[700]}
					>
						<FavoriteList
							setErrorMsg={setErrorMsg}
							setMsg={setMsg}
							userEmail={userEmail}
						/>
					</CategoryBanner>
				)}
				{!session && !foundSession && (
					<Box width={'100%'}>
						<LandingCardList />

						<PromoSection
							link="/preppers"
							imgUrl="/images/cooking/defaultMeal.jpg"
						/>
						<PromoSection
							title="Share your beloved creations"
							link="/register"
							description="Whether it be the unique desert that only you have thought of, or good old fashion meals that you have perfected, share those dishes with your community and inspire others to spread joy."
							bgColor={colors.primary[900]}
							btnText="Register Now"
							reverse
						/>
						<PromoSection
							imgUrl="/images/cooking/vegan.jpg"
							btnText="Find Plant Based food"
							title="Discover unique plant based dishes"
							description="Experience the variety of cultural dining prepared by those who cherish plant-based food and want to share their delights."
						/>
					</Box>
				)}

				{(errorMsg.length > 0 || errorServer) && (
					<ErrorAlert
						width="50%"
						error={errorMsg || errorServer}
						setError={setErrorMsg}
					/>
				)}
				{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
				{isSearching && <CustomLoader />}
			</Box>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
}
