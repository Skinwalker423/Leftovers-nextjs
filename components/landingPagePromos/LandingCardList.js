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
			<LandingCard link="/about" image="/images/alegria/prepper2.png" />
			<LandingCard
				image="/images/alegria/cookingtogether.png"
				title="Discover family meals"
				link="/preppers"
				description="There are many undiscovered homemade traditional meals made by hidden talent all around you. Seek preppers for a true local experience."
			/>
			<LandingCard
				image="/images/alegria/prepper.png"
				title="Share your gift to all"
				link="/register"
				description="Do you have a special desert recipe that markets or restaraunts don't seem to have? Now you can create those delights from your kicthen to share with others."
			/>
		</Box>
	);
};

export default LandingCardList;
