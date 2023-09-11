import React, { useEffect, useContext } from 'react';
import FavoriteList from '../components/prepperLists/favoriteList';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';
import Head from 'next/head';
import { Alert, Box, Typography } from '@mui/material';
import { UserContext } from '../store/UserContext';

import {
	connectMongoDb,
	findExistingUserEmail
} from '../db/mongodb/mongoDbUtils';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);
	const user = {
		name: session.user?.name || null,
		image: session.user?.image || null,
		email: session.user?.email || null
	};
	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		};
	}

	const client = await connectMongoDb();
	const document = await findExistingUserEmail(client, session.user.email);
	const favoritePreppersList = await fetchFavoritePreppers();

	return {
		props: {
			favoriteList: document.favorites || favoritePreppersList,
			userSession: user
		}
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
		<Box>
			<Head>
				<title>Favorites</title>
				<meta name="description" content="Your favorite preppers" />
			</Head>
			<Box position={'relative'} top={{ xs: 100, md: -50 }}>
				<Typography textAlign={'center'} color={'secondary'} variant="h1">
					Favorites
				</Typography>
				{!favoriteList.length && (
					<Alert sx={{ mt: '2em' }} color="warning">
						<Typography variant="h1">No Favorites added</Typography>
					</Alert>
				)}
				<Box
					width={'100%'}
					height={'100%'}
					mt="2rem"
					display="flex"
					gap="1rem"
					flexWrap={'wrap'}
				>
					<FavoriteList
						userEmail={userEmail}
						favRow={true}
						favoriteList={state.favorites}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Favorites;
