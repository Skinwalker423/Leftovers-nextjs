import { Box } from '@mui/material';
import React from 'react';
import PrepperCard from '../Card/prepperCard';
import styles from './favoriteList.module.css';
import CustomLoader from '../UI/Loader';

const FavoriteList = ({ favoriteList, favRow, userEmail }) => {
	const avatar = 'https://i.pravatar.cc/300';
	if (!favoriteList) {
		return <CustomLoader />;
	}
	return (
		<Box
			display={'flex'}
			flexWrap='wrap'
			width={'100%'}
			gap='3em'
			sx={{
				height: {
					xs: favRow ? '' : '30rem',
					sm: favRow ? '' : '30rem',
					md: '',
					lg: '',
				},
			}}
			className={styles.prepCardContainer}>
			{favoriteList.map((prepper) => {
				return (
					<PrepperCard
						key={prepper.id}
						isFavorited={true}
						name={prepper.name}
						subTitle={prepper.email}
						avatar={avatar}
						id={prepper.id}
						userEmail={userEmail}
					/>
				);
			})}
		</Box>
	);
};

export default FavoriteList;
