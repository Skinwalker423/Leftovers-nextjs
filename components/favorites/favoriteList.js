import { Box } from '@mui/material';
import React from 'react';
import PrepperCard from '../Card/prepperCard';
import styles from './favoriteList.module.css';
import CustomLoader from '../UI/Loader';
import { useColors } from '../../hooks/useColors';

const FavoriteList = ({ favoriteList, favRow, isFavorited }) => {
	const { colors } = useColors();
	const avatar = 'https://i.pravatar.cc/300';
	if (!favoriteList) {
		return <CustomLoader />;
	}
	return (
		<Box
			display={'flex'}
			overflow='auto'
			sx={{
				overflowY: 'hidden',
				height: {
					xs: favRow ? '' : '30rem',
					sm: favRow ? '' : '30rem',
					md: '',
					lg: '',
				},
			}}
			flexWrap='wrap'
			className={styles.prepCardContainer}>
			{favoriteList.map((prepper) => {
				return (
					<PrepperCard
						key={prepper.id}
						isFavorited={isFavorited}
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
