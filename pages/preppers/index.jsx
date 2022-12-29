import React from 'react';
import NavBar from '../../components/navbar/NavBar';
import { Box, Typography } from '@mui/material';
import PrepperCard from '../../components/Card';
import Link from 'next/link';
import { mockDataContacts } from '../../data/mockData';
import styles from './index.module.css';

export async function getStaticProps() {
	return {
		props: {
			preppers: mockDataContacts,
		},
	};
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
			<NavBar />
			<Typography variant='h1'>List of all preppers in your area</Typography>
			<Box mt='20px' display='flex' gap='10px' flexWrap={'wrap'}>
				{preppers.map((prepper) => {
					const avatar = 'https://i.pravatar.cc/300';
					return (
						<Link
							className={styles.prepCard}
							key={prepper.id}
							href={`/preppers/${prepper.id}`}>
							<PrepperCard
								title={prepper.name}
								subTitle={prepper.email}
								avatar={avatar}
								id={prepper.id}
							/>
						</Link>
					);
				})}
			</Box>
		</Box>
	);
};

export default Home;
