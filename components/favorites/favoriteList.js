import { Box } from '@mui/material';
import React from 'react';
import PrepperCard from '../Card/prepperCard';
import styles from './favoriteList.module.css';
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
			display={'flex'}
			overflow='auto'
			sx={{ overflowY: 'hidden' }}
			// mx='50px'
			className={styles.prepCardContainer}>
			{favoriteList.map((prepper) => {
				return (
					<PrepperCard
						title={prepper.name}
						subTitle={prepper.email}
						avatar={avatar}
						id={prepper.id}
					/>
				);
			})}
		</Box>
	);
};

export default FavoriteList;
