import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import { useColors } from '../../../hooks/useColors';
import FindLocalPreppersSearchBar from '../../searchBar/findLocalPreppers';
import headerImg from '../../../public/ball-park.jpg';

const LandingHeader = ({
	title = 'Header goes here',
	handleZipChange,
	handleZipSearchForm,
	errorMsg,
	zipCode
}) => {
	const { colors } = useColors();
	return (
		<Box position={'relative'} height={{ xs: '65vh', md: '85vh' }} width="100%">
			<Image
				priority={true}
				fill
				src={headerImg}
				alt="landing page image of various popular American foods"
			/>
			<Stack
				position={'relative'}
				alignItems={'center'}
				justifyContent={'center'}
				top={{ xs: '5%', sm: '15%' }}
				p={'1rem'}
			>
				<Typography
					variant="h1"
					lineHeight={{ xs: 'normal', md: 1.5 }}
					fontWeight={900}
					fontSize={{ xs: '4em', lg: '5em' }}
					color={colors.orangeAccent[800]}
					textAlign={'center'}
					sx={{
						textShadow:
							'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
					}}
				>
					{title}
				</Typography>
				<Typography
					textAlign={'center'}
					maxWidth={{ xs: '17em', sm: '25em' }}
					fontWeight={600}
					lineHeight={1.5}
					fontSize={{ xs: 'large', md: '1.75em' }}
					color={'white'}
					sx={{
						textShadow:
							'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
					}}
				>
					The largest food sharing platform, where you can find local authentic
					meals being prepared by the community and shared to the community.
					Search for local participating meal preppers!
				</Typography>
				<FindLocalPreppersSearchBar
					handleZipChange={handleZipChange}
					handleZipSearchForm={handleZipSearchForm}
					errorMsg={errorMsg}
					zipCode={zipCode}
				/>
			</Stack>
		</Box>
	);
};

export default LandingHeader;
