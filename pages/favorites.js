import React, { useEffect, useContext } from 'react';
import FavoriteList from '../components/favorites/favoriteList';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';
import Head from 'next/head';
import { Box } from '@mui/material';
import styles from '/styles/Home.module.css';
import Footer from '../components/layout/footer/footer';
import { UserContext } from '../store/UserContext';

import {
	connectMongoDb,
	findExistingUserEmail,
} from '../db/mongodb/mongoDbUtils';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps({ req, res }) {
	const session = await unstable_getServerSession(req, res, authOptions);
	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	const client = await connectMongoDb();
	const document = await findExistingUserEmail(client, session.user.email);
	const favoritePreppersList = await fetchFavoritePreppers();

	return {
		props: {
			favoriteList: document.favorites || favoritePreppersList,
			userSession: session,
		},
	};
}

const Favorites = ({ favoriteList, userSession }) => {
	const userEmail = userSession?.user?.email;
	const { state, setFavoritesList } = useContext(UserContext);

	useEffect(() => {
		if (favoriteList) {
			setFavoritesList(favoriteList);
		}
	}, []);

	return (
		<Box className={styles.container}>
			<Head>
				<title>Favorites</title>
				<meta name='description' content='Your favorite preppers' />
			</Head>
			<main style={{ marginTop: '80px' }} className={styles.main}>
				<FavoriteList
					userEmail={userEmail}
					favRow={true}
					favoriteList={state.favorites}
				/>
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title='Leftovers' />
			</footer>
		</Box>
	);
};

export default Favorites;
