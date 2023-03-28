import React, { useEffect, useContext } from 'react';
import FavoriteList from '../components/favorites/favoriteList';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';
import Head from 'next/head';
import { Alert, Box, Typography } from '@mui/material';
import styles from '/styles/Home.module.css';
import Footer from '../components/layout/footer/footer';
import { UserContext } from '../store/UserContext';

import {
	connectMongoDb,
	findExistingUserEmail,
} from '../db/mongodb/mongoDbUtils';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);
	const user = {
		name: session.user?.name || null,
		image: session.user?.image || null,
		email: session.user?.email || null,
	};
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
			userSession: user,
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
			<main style={{ marginTop: '8rem' }} className={styles.main}>
				<Typography color={'secondary'} variant='h1'>
					Favorites
				</Typography>
				{!favoriteList.length && (
					<Alert sx={{ mt: '2em' }} color='warning'>
						<Typography variant='h1'>No Favorites added</Typography>
					</Alert>
				)}
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
