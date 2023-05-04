import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import styles from './landingPage.module.css';
import Stack from '@mui/material/Stack';

const LandingHeader = ({ title = 'Header goes here', img = '/art.jpg' }) => {
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
					className={styles.title}
					lineHeight={1.5}
					fontWeight={900}
					fontSize="4rem"
					color="white"
					textAlign={'center'}
				>
					{title}
				</Typography>
				<Typography
					textAlign={'center'}
					lineHeight={1.5}
					fontSize={'large'}
					color={'white'}
				>
					The largest food sharing platform, where you can find local authentic
					meals being prepared by the community and shared to the community
				</Typography>
			</Stack>
		</Box>
	);
};

export default LandingHeader;
