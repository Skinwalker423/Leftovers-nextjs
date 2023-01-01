import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const LogoTitle = ({ img, title }) => {
	return (
		<Box display={'flex'} justifyContent='center' alignItems='center'>
			<Image src={img} width={50} height={50} />
			<Typography
				px={'20px'}
				textAlign={'center'}
				variant='h2'
				component='h1'
				gutterBottom>
				{title}
			</Typography>
		</Box>
	);
};

export default LogoTitle;
