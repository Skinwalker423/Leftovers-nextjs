import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import styles from './categoryBanner.module.css';

const CategoryBanner = ({
	title = 'Title Here',
	bgColor,
	children,
	link = '/'
}) => {
	const { colors } = useColors();
	return (
		<Box
			width={'96%'}
			m="1em"
			borderRadius={'2em'}
			sx={{ overflowY: 'hidden' }}
			backgroundColor={bgColor}
		>
			<Link style={{ textDecoration: 'none' }} href={link}>
				<Typography
					color={colors.primary[900]}
					textAlign={'center'}
					mt=".5em"
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
