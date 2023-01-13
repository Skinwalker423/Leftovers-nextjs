import { Box } from '@mui/material';
import React from 'react';
import { mockDataContacts } from '../../data/mockData';
import PrepperCard from '../Card/prepperCard';
import styles from './FavoriteList.module.css';
import Link from 'next/link';

const FavoriteList = () => {
	const avatar = 'https://i.pravatar.cc/300';
	if (!mockDataContacts) {
		return <p>Loading...</p>;
	}
	return (
		<Box
			width={'100%'}
			display={'flex'}
			flexWrap='wrap'
			justifyContent='space-evenly'
			className={styles.prepCardContainer}>
			{mockDataContacts.map((prepper) => {
				if (prepper.favorite) {
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
				}
			})}
		</Box>
	);
};

export default FavoriteList;
