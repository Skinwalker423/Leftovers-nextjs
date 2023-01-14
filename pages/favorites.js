import React from 'react';
import FavoriteList from '../components/favorites/favoriteList';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';
import Head from 'next/head';
import { Box } from '@mui/material';
import styles from '/styles/Home.module.css';
import Footer from '../components/footer/footer';

export async function getServerSideProps() {
	const favoritePreppersList = await fetchFavoritePreppers();
	return {
		props: {
			favoriteList: favoritePreppersList,
		},
	};
}

const Favorites = ({ favoriteList }) => {
	return (
		<Box className={styles.container}>
			<Head>
				<title>Favorites</title>
				<meta name='description' content='Your favorite preppers' />
			</Head>
			<main>
				<FavoriteList favoriteList={favoriteList} />
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title='Leftovers' />
			</footer>
		</Box>
	);
};

export default Favorites;
