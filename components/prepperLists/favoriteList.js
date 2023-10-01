import React, { useContext, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import Box from '@mui/material/Box';
import PrepperCard from '../Card/prepperCard';
import CategoryPaginationHeader from '../category/categoryPaginationHeader';
import { useColors } from '../../hooks/useColors';

const FavoriteList = ({ favRow, userEmail, setMsg, setErrorMsg }) => {
	const avatar = 'https://i.pravatar.cc/300';
	const { state } = useContext(UserContext);
	const [slicedPreppers, setSlicedPreppers] = useState([]);
	const { colors } = useColors();

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
			py={2}
			sx={{
				height: {
					xs: favRow ? '100%' : 'unset',
					overflowX: { xs: 'hidden' },
					overflowY: 'hidden'
				}
			}}
		>
			<CategoryPaginationHeader
				title="Favorites"
				resultsPerPage={3}
				list={state.favorites}
				setSlicedList={setSlicedPreppers}
				userEmail={userEmail}
				color={colors.blueAccent[700]}
			/>
			{slicedPreppers.length > 0 &&
				slicedPreppers.map((prepper) => {
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
							mealsServed={prepper.mealsServed}
						/>
					);
				})}
		</Box>
	);
};

export default FavoriteList;
