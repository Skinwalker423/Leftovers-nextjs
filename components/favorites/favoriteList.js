import { Box } from '@mui/material';
import React from 'react';
import PrepperCard from '../Card/prepperCard';
import styles from './FavoriteList.module.css';
import Link from 'next/link';
import CustomLoader from '../Loader';
import { useColors } from '../../hooks/useColors';

const FavoriteList = ({ favoriteList }) => {
	const { colors } = useColors();
	const avatar = 'https://i.pravatar.cc/300';
	if (!favoriteList) {
		return <CustomLoader />;
	}
	return (
		<Box
			// width={'80%'}
			display={'flex'}
			overflow='auto'
			sx={{ overflowY: 'hidden' }}
			mx='50px'
			// p='50px'
			// backgroundColor={colors.blueAccent[800]}

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
