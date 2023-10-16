import React from 'react';
import { Box } from '@mui/material';
import { useColors } from '../../hooks/useColors';

const CategoryBanner = ({ bgColor, children }) => {
	const { colors } = useColors();
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
