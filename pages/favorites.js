import React, { useEffect, useContext } from 'react';
import FavoriteList from '../components/prepperLists/favoriteList';
import fetchFavoritePreppers from '../utils/fetchFavoritePreppers';
import Head from 'next/head';
import { Alert, Box, Pagination, Typography } from '@mui/material';
import { UserContext } from '../store/UserContext';

import {
	connectMongoDb,
	findExistingUserEmail
} from '../db/mongodb/mongoDbUtils';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import PrepperCard from '../components/Card/prepperCard';
import { useState } from 'react';

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
	const [msg, setMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const itemsPerPages = 8;
	const count = state.favorites.length;
	const pages = Math.ceil(count / itemsPerPages);

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
					justifyContent={'center'}
				>
					{state.favorites.length > 0 ? (
						<Box display={'flex'} flexDirection={'column'}>
							<Box
								display="flex"
								justifyContent={'center'}
								gap={4}
								flexWrap={'wrap'}
							>
								{state.favorites.map((prepper) => {
									const avatar = 'https://i.pravatar.cc/300';

									return (
										<PrepperCard
											isFavorited={true}
											key={prepper.id}
											name={prepper.kitchenTitle}
											email={prepper.email}
											subTitle={prepper.name}
											avatar={prepper.profileImgUrl || avatar}
											kitchenImgUrl={prepper.kitchenImgUrl}
											id={prepper.id}
											userEmail={userEmail ? userEmail : ''}
											description={prepper.description}
											setMsg={setMsg}
											setErrorMsg={setErrorMsg}
											mealsServed={prepper.mealsServed}
										/>
									);
								})}
							</Box>
							{pages > 1 && (
								<Pagination
									sx={{ display: 'flex', justifyContent: 'center', my: '2rem' }}
									size="large"
									count={pages}
									onChange={handleChange}
								/>
							)}
						</Box>
					) : (
						<Box
							width={'100%'}
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<Alert
								severity="error"
								sx={{
									width: '50%'
								}}
							>
								<Typography textAlign={'center'} variant="h2">
									No preppers available nearby.
								</Typography>
							</Alert>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Favorites;
