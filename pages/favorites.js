import React from 'react';
import FavoriteList from '../components/favorites/favoriteList';
import { mockDataContacts } from '../data/mockData';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';

export async function getServerSideProps() {
	const favoritePreppersList = await fetchFavoritePreppers();
	return {
		props: {
			favoriteList: favoritePreppersList,
		},
	};
}

const Favorites = ({ favoriteList }) => {
	return <FavoriteList favoriteList={favoriteList} />;
};

export default Favorites;
