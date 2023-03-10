import React from 'react';
import { Box, Typography } from '@mui/material';
import PrepperCard from '../../components/Card/prepperCard';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { mockDataContacts } from '../../db/mockData';
import Head from 'next/head';
import styles from './index.module.css';
import {
	findAllInCollection,
	connectMongoDb,
	findExistingUserEmail,
} from '../../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res }) {
	try {
		const client = await connectMongoDb();
		const allPreppers = await findAllInCollection(client, 'preppers');
		const session = await unstable_getServerSession(req, res, authOptions);

		if (!session) {
			return {
				props: {
					preppers: allPreppers || [],
					userEmail: null,
					favoritesList: [],
				},
			};
		}
		const userEmail = session?.user?.email;
		const userDocument =
			userEmail && (await findExistingUserEmail(client, userEmail));
		const favoritesList = userDocument.favorites.map(
			(favPrepper) => favPrepper.id
		);

		return {
			props: {
				preppers: allPreppers || [],
				userEmail: userEmail ? userEmail : null,
				favoritesList: favoritesList || [],
			},
		};
	} catch (err) {
		console.error('could not find preppers', err);
		return {
			props: {
				preppers: mockDataContacts || [],
			},
		};
	}
}

const Home = ({ preppers, userEmail, favoritesList }) => {
	return (
		<Box
			height='100%'
			m='6rem 3rem'
			flexDirection={'column'}
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<Head>
				<title>Local Preppers</title>
				<meta name='description' content='List of all preppers in your area' />
			</Head>
			<Typography variant='h1'>List of all preppers in your area</Typography>
			<Box mt='20px' display='flex' gap='10px' flexWrap={'wrap'}>
				{preppers.map((prepper) => {
					const avatar = 'https://i.pravatar.cc/300';

					const favorited =
						favoritesList && favoritesList.includes(prepper.id) ? true : false;

					return (
						<PrepperCard
							isFavorited={favorited}
							className={styles.prepCard}
							key={prepper.id}
							name={prepper.kitchenTitle}
							email={prepper.email}
							subTitle={prepper.name}
							avatar={avatar}
							id={prepper.id}
							userEmail={userEmail ? userEmail : ''}
							description={prepper.description}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default Home;
