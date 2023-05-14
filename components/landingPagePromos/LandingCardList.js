import React from 'react';
import Box from '@mui/material/Box';
import LandingCard from '../Card/landingCard';
import { useColors } from '../../hooks/useColors';

const LandingCardList = () => {
	const { colors } = useColors();
	return (
		<Box
			position={'relative'}
			py={'3em'}
			width={'100%'}
			display={'flex'}
			flexWrap={'wrap'}
			justifyContent={'space-evenly'}
			alignItems={'center'}
			height={{ lg: '70rem' }}
			backgroundColor={colors.primary[900]}
			gap={5}
		>
			<LandingCard image="/images/alegria/prepper2.png" />
			<LandingCard image="/images/alegria/cookingtogether.png" />
			<LandingCard
				image="/images/alegria/prepper.png"
				title="Share your gift to all"
				description="Do you have a special desert recipe that markets or restaraunts don't seem to have? Now you can create those delights from your kicthen to share with others."
			/>
		</Box>
	);
};

export default LandingCardList;
