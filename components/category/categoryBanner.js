import React from 'react';
import { Box } from '@mui/material';

const CategoryBanner = ({ bgColor, children }) => {
	return (
		<Box
			width={'100%'}
			sx={{ overflow: 'auto' }}
			alignItems={'center'}
			justifyContent={'center'}
			borderTop={`2px solid ${bgColor}`}
			py={5}
		>
			{children}
		</Box>
	);
};

export default CategoryBanner;
