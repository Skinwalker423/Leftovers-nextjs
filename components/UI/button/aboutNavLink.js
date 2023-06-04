import React from 'react';
import Box from '@mui/material/Box';
import { useColors } from '../../../hooks/useColors';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

const AboutNavLink = ({ href = '/', title = 'Title Here', children }) => {
	const { colors } = useColors();
	return (
		<Link style={{ textDecoration: 'none' }} href={href}>
			<Box
				width={'17rem'}
				height={'3rem'}
				display={'flex'}
				backgroundColor={colors.orangeAccent[600]}
				borderRadius={'.5em'}
				color={'white'}
				justifyContent={'flex-start'}
				alignItems={'center'}
				px={'1rem'}
				gap={1}
				sx={{
					':hover': {
						backgroundColor: colors.orangeAccent[400]
					}
				}}
			>
				{children}
				<Typography variant="h3">{title}</Typography>
			</Box>
		</Link>
	);
};

export default AboutNavLink;
