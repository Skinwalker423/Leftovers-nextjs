import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import { useColors } from '../../../hooks/useColors';

const LandingHeader = ({ title = 'Header goes here', img = '/art.jpg' }) => {
	const { colors } = useColors();
	return (
		<Box position={'relative'} top="0" height={'85vh'} width="100%">
			<Image
				priority={true}
				fill
				src={img}
				alt="landing page image of various popular American foods"
			/>
			<Stack
				position={'relative'}
				alignItems={'center'}
				justifyContent={'center'}
				top={'15%'}
				p={'1rem'}
			>
				<Typography
					variant="h1"
					lineHeight={{ xs: 'normal', md: 1.5 }}
					fontWeight={900}
					fontSize={{ xs: '4em', lg: '5em' }}
					color={colors.orangeAccent[100]}
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
					lineHeight={1.5}
					fontSize={{ xs: 'large', md: '1.75em' }}
					color={'white'}
					sx={{
						textShadow:
							'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
					}}
				>
					The largest food sharing platform, where you can find local authentic
					meals being prepared by the community and shared to the community
				</Typography>
			</Stack>
		</Box>
	);
};

export default LandingHeader;
