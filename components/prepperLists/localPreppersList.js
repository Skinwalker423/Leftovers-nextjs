import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box } from '@mui/material';
import PrepperCard from '../Card/prepperCard';
import CategoryPaginationHeader from '../category/categoryPaginationHeader';

const LocalPreppersList = ({ userEmail, setMsg, setErrorMsg }) => {
	const { state } = useContext(UserContext);
	const [slicedPreppers, setSlicedPreppers] = useState([]);
	const [pag, setPag] = useState({ start: 0, end: 3 });

	const length = state.localPreppers.length - 1;
	const preppersPerPage = 3;
	const disableNext = pag.end > length;
	const disablePrev = pag.start <= 0;

	useEffect(() => {
		const slicedList = state.localPreppers
			.slice(pag.start, pag.end)
			.filter((el) => el.email !== userEmail);
		console.log('slice', slicedList);
		setSlicedPreppers(slicedList);
	}, [pag]);

	const setNewPagStart = () => {
		if (pag.end > length) {
			return;
		}
		setPag((prevPag) => {
			return {
				...prevPag,
				start: prevPag.start + preppersPerPage,
				end: prevPag.end + preppersPerPage
			};
		});
	};
	const setNewPagEnd = () => {};

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
				title="Local Preppers"
				length={length}
				resultsPerPage={preppersPerPage}
				setNewPagStart={setNewPagStart}
				disableNext={disableNext}
				disablePrev={disablePrev}
			/>
			<Box
				sx={{ overflowX: { xs: 'hidden' }, overflowY: 'auto' }}
				display={'flex'}
				gap={5}
				justifyContent={'center'}
				alignItems={'center'}
				flexWrap={{ xs: 'wrap', md: 'wrap' }}
				height={{ xs: '90%', md: '80%' }}
				py={5}
			>
				{state.localPreppers && state.localPreppers.length !== 0 && preppers}
			</Box>
		</Box>
	);
};

export default LocalPreppersList;

{
	/* <Box
			sx={{ overflowX: { xs: 'hidden' }, overflowY: 'auto' }}
			display={'flex'}
			gap={5}
			justifyContent={'center'}
			alignItems={'center'}
			flexWrap={{ xs: 'wrap', md: 'wrap' }}
			height={{ xs: '90%', md: '80%' }}
		>
			{state.localPreppers && state.localPreppers.length !== 0 && preppers}
		</Box> */
}
