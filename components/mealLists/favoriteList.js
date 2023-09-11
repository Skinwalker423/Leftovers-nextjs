import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import Box from '@mui/material/Box';
import PrepperCard from '../Card/prepperCard';

const FavoriteList = ({ favRow, userEmail, setMsg, setErrorMsg }) => {
	const avatar = 'https://i.pravatar.cc/300';
	const { state } = useContext(UserContext);

	console.log('favorites', state.favorites);

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
					xs: favRow ? '100%' : 'unset',
					overflowX: { xs: 'hidden' },
					overflowY: 'hidden'
				}
			}}
		>
			{state.favorites.map((prepper) => {
				return (
					<PrepperCard
						key={prepper.id}
						isFavorited={true}
						name={prepper.name}
						avatar={prepper.profileImgUrl || avatar}
						id={prepper.id}
						userEmail={userEmail}
						description={prepper.description}
						kitchenImgUrl={prepper.kitchenImgUrl}
						setErrorMsg={setErrorMsg}
						setMsg={setMsg}
						isKitchenClosed={prepper.isKitchenClosed}
					/>
				);
			})}
		</Box>
	);
};

export default FavoriteList;
