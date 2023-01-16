import React from 'react';
import { Box, Typography } from '@mui/material';

const CategoryBanner = ({ title = 'Title here', bgColor, children }) => {
	return (
		<Box
			width={'95%'}
			m='20px'
			borderRadius={'2em'}
			sx={{ overflowY: 'hidden' }}
			backgroundColor={bgColor}>
			<Typography textAlign={'center'} variant='h2'>
				{title}
			</Typography>
			{children}
		</Box>
	);
};

export default CategoryBanner;
