import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './landingPage.module.css';

const LandingHeader = () => {
	return (
		<Box position={'absolute'} top='0' height={'75vh'} width='100%'>
			<Image fill src={'/ball-park.jpg'} alt='landing page image' />
			<Typography
				variant='h1'
				className={styles.title}
				lineHeight={1.15}
				fontSize='4rem'
				color='white'>
				Welcome to Leftovers!
			</Typography>
		</Box>
	);
};

export default LandingHeader;
