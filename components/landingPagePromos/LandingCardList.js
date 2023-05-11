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
			<LandingCard />
			<LandingCard image="/images/alegria/prepper.png" />
			<LandingCard image="/images/alegria/cookingtogether.png" />
		</Box>
	);
};

export default LandingCardList;
