import React, { useContext, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box } from '@mui/material';
import PrepperCard from '../Card/prepperCard';
import CategoryPaginationHeader from '../category/categoryPaginationHeader';
import { useColors } from '../../hooks/useColors';

const SearchedList = ({ userEmail, setMsg, setErrorMsg }) => {
	const { state } = useContext(UserContext);
	const [slicedPreppers, setSlicedPreppers] = useState([]);
	const { colors } = useColors();

	const favoritesPrepId = state.favorites.map(({ id }) => id);

	const preppers = slicedPreppers.map(
		({
			id,
			description,
			kitchenTitle,
			email,
			kitchenImgUrl,
			profileImgUrl,
			mealsServed
		}) => {
			const favorited =
				state.favorites && favoritesPrepId.includes(id) ? true : false;

			const avatar = 'https://i.pravatar.cc/300';
			if (email !== userEmail) {
				return (
					<PrepperCard
						isFavorited={favorited}
						name={kitchenTitle}
						avatar={profileImgUrl || avatar}
						id={id}
						key={id}
						description={description}
						userEmail={userEmail}
						setMsg={setMsg}
						setErrorMsg={setErrorMsg}
						kitchenImgUrl={kitchenImgUrl}
						mealsServed={mealsServed}
					/>
				);
			}
		}
	);

	return (
		<Box display={'flex'} flexDirection={'column'}>
			<CategoryPaginationHeader
				title="Searched Preppers"
				resultsPerPage={1}
				list={state.searchedPreppers}
				setSlicedList={setSlicedPreppers}
				userEmail={userEmail}
				color={colors.redAccent[700]}
				link="/"
			/>
			<Box
				sx={{ overflowX: { xs: 'hidden' }, overflowY: 'auto' }}
				display={'flex'}
				gap={{ xs: 0, sm: 1, md: 3, lg: 5 }}
				width={'100%'}
				justifyContent={'center'}
				alignItems={'center'}
				height={{ xs: '90%', md: '80%' }}
				py={5}
			>
				{state.searchedPreppers &&
					state.searchedPreppers.length !== 0 &&
					preppers}
			</Box>
		</Box>
	);
};

export default SearchedList;
