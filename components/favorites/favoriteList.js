import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import Box from '@mui/material/Box';
import PrepperCard from '../Card/prepperCard';
import styles from './favoriteList.module.css';

const FavoriteList = ({ favRow, userEmail }) => {
	const avatar = 'https://i.pravatar.cc/300';
	const { state } = useContext(UserContext);

	return (
		<Box
			display={'flex'}
			flexWrap={{ xs: 'unset', md: 'wrap' }}
			width={'100%'}
			gap='3em'
			mb={'1em'}
			sx={{
				height: {
					xs: favRow ? '' : '30rem',
					sm: favRow ? '' : '30rem',
					md: '',
					lg: '',
				},
				overflowY: 'auto',
			}}
			className={styles.prepCardContainer}>
			{state.favorites.map((prepper) => {
				return (
					<PrepperCard
						key={prepper.id}
						isFavorited={true}
						name={prepper.name}
						avatar={avatar}
						id={prepper.id}
						userEmail={userEmail}
						description={prepper.description}
					/>
				);
			})}
		</Box>
	);
};

export default FavoriteList;
