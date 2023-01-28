import React from 'react';
import { Box, Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import styles from './categoryBanner.module.css';

const CategoryBanner = ({ title = 'Title here', bgColor, children }) => {
	const { colors } = useColors();
	return (
		<Box
			width={'95%'}
			m='1em'
			borderRadius={'2em'}
			sx={{ overflowY: 'hidden' }}
			backgroundColor={bgColor}>
			<Typography
				color={colors.orangeAccent[900]}
				textAlign={'center'}
				my='1em'
				variant='h2'>
				{title}
			</Typography>
			{children}
		</Box>
	);
};

export default CategoryBanner;