import { Box } from '@mui/material';
import React from 'react';
import PrepperCard from '../Card/prepperCard';
import styles from './FavoriteList.module.css';
import Link from 'next/link';
import CustomLoader from '../Loader';

const FavoriteList = ({ favoriteList }) => {
	const avatar = 'https://i.pravatar.cc/300';
	if (!favoriteList) {
		return <CustomLoader />;
	}
	return (
		<Box
			width={'100%'}
			display={'flex'}
			flexWrap='wrap'
			justifyContent='space-evenly'
			className={styles.prepCardContainer}>
			{favoriteList.map((prepper) => {
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
	);
};

export default FavoriteList;
