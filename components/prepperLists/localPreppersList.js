import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box, IconButton, Typography } from '@mui/material';
import PrepperCard from '../Card/prepperCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const LocalPreppersList = ({ userEmail, setMsg, setErrorMsg }) => {
	const { state } = useContext(UserContext);

	const favoritesPrepId = state.favorites.map(({ id }) => id);

	const preppers = state.localPreppers.map(
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
			<Box display={'flex'} justifyContent={'flex-end'}>
				<Typography>See All</Typography>
				<Box display={'flex'}>
					<IconButton>
						<ArrowBackIosIcon />
					</IconButton>
					<IconButton>
						<ArrowForwardIosIcon />
					</IconButton>
				</Box>
			</Box>
			<Box
				sx={{ overflowX: { xs: 'hidden' }, overflowY: 'auto' }}
				display={'flex'}
				gap={5}
				justifyContent={'center'}
				alignItems={'center'}
				flexWrap={{ xs: 'wrap', md: 'wrap' }}
				height={{ xs: '90%', md: '80%' }}
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
