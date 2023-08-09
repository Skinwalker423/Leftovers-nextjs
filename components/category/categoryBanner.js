import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';

const CategoryBanner = ({
	title = 'Title Here',
	bgColor,
	children,
	link = '/'
}) => {
	const { colors } = useColors();
	return (
		<Box
			width={'100%'}
			height={{ xs: '65rem', sm: '40rem' }}
			sx={{ overflow: 'auto' }}
			alignItems={'center'}
			justifyContent={'center'}
			borderTop={`2px solid ${bgColor}`}
		>
			<Link style={{ textDecoration: 'none' }} href={link}>
				<Typography
					color={bgColor}
					textAlign={'center'}
					my=".75em"
					variant="h1"
				>
					{title}
				</Typography>
			</Link>
			{children}
		</Box>
	);
};

export default CategoryBanner;
