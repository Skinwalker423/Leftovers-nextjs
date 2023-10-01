import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box } from '@mui/material';
import PrepperCard from '../Card/prepperCard';
import CategoryPaginationHeader from '../category/categoryPaginationHeader';

const LocalPreppersList = ({ userEmail, setMsg, setErrorMsg }) => {
	const { state } = useContext(UserContext);
	const [slicedPreppers, setSlicedPreppers] = useState([]);
	// const [pag, setPag] = useState({ start: 0, end: preppersPerPage });

	// const { pag, disableNext, disablePrev, setNewPagNext, setNewPagPrev } =
	// 	useCustomPagination(state.localPreppers, preppersPerPage);

	// const length = state.localPreppers.length - 1;
	// const disableNext = pag.end > length - 1;
	// const disablePrev = pag.start <= 0;

	// useEffect(() => {
	// 	const slicedList = state.localPreppers
	// 		.filter((el) => el.email !== userEmail)
	// 		.slice(pag.start, pag.end);
	// 	setSlicedPreppers(slicedList);
	// }, [pag]);

	// const setNewPagNext = () => {
	// 	if (pag.end > length) {
	// 		return;
	// 	}
	// 	setPag((prevPag) => {
	// 		return {
	// 			...prevPag,
	// 			start: prevPag.start + preppersPerPage,
	// 			end: prevPag.end + preppersPerPage
	// 		};
	// 	});
	// };
	// const setNewPagPrev = () => {
	// 	if (pag.start <= 0) {
	// 		return;
	// 	}
	// 	setPag((prevPag) => {
	// 		return {
	// 			...prevPag,
	// 			start: prevPag.start - preppersPerPage,
	// 			end: prevPag.end - preppersPerPage
	// 		};
	// 	});
	// };

	const favoritesPrepId = state.favorites.map(({ id }) => id);

	console.log('sliced preppers', slicedPreppers);

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
				title="Local Preppers"
				resultsPerPage={2}
				list={state.localPreppers}
				setSlicedList={setSlicedPreppers}
				userEmail={userEmail}
			/>
			<Box
				sx={{ overflowX: { xs: 'hidden' }, overflowY: 'auto' }}
				display={'flex'}
				gap={5}
				width={'100%'}
				justifyContent={'center'}
				alignItems={'center'}
				height={{ xs: '90%', md: '80%' }}
				py={5}
			>
				{state.localPreppers && state.localPreppers.length !== 0 && preppers}
			</Box>
		</Box>
	);
};

export default LocalPreppersList;
