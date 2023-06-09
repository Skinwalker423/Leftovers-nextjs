import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import Box from '@mui/material/Box';
import PrepperCard from '../Card/prepperCard';
import styles from './favoriteList.module.css';

const FavoriteList = ({ favRow, userEmail, setMsg, setErrorMsg }) => {
	const avatar = 'https://i.pravatar.cc/300';
	const { state } = useContext(UserContext);

	return (
		<Box
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			flexWrap={'wrap'}
			width={'100%'}
			justifyContent={'center'}
			alignItems={'center'}
			gap="3em"
			my={'1em'}
			sx={{
				height: {
					xs: favRow ? '100%' : 'unset'
				}
			}}
			className={styles.prepCardContainer}
		>
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
						kitchenImgUrl={prepper.kitchenImgUrl}
						setErrorMsg={setErrorMsg}
						setMsg={setMsg}
					/>
				);
			})}
		</Box>
	);
};

export default FavoriteList;
