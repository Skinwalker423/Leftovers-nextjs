import React from 'react';
import { Box, Typography } from '@mui/material';
import PrepperCard from '../../components/Card/prepperCard';
import Link from 'next/link';
import { mockDataContacts } from '../../db/mockData';
import styles from './index.module.css';
import {
	findAllInCollection,
	connectMongoDb,
} from '../../db/mongodb/mongoDbUtils';

export async function getServerSideProps() {
	try {
		const client = await connectMongoDb();
		const allPreppers = await findAllInCollection(client, 'preppers');

		console.log({ allPreppers });
		return {
			props: {
				preppers: allPreppers || [],
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

const Home = ({ preppers }) => {
	return (
		<Box
			height='100%'
			m='6rem 3rem'
			flexDirection={'column'}
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<Typography variant='h1'>List of all preppers in your area</Typography>
			<Box mt='20px' display='flex' gap='10px' flexWrap={'wrap'}>
				{preppers.map((prepper) => {
					const avatar = 'https://i.pravatar.cc/300';

					return (
						<PrepperCard
							className={styles.prepCard}
							key={prepper.id}
							title={prepper.name}
							subTitle={prepper.email}
							avatar={avatar}
							id={prepper.id}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default Home;
