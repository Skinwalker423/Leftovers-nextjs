import React from 'react';
import Box from '@mui/material/Box';
import { useColors } from '../../hooks/useColors';
import { Typography } from '@mui/material';

const Panel = ({ children, title = 'Title here' }) => {
	const { colors } = useColors();
	return (
		<Box
			width={'100%'}
			height={'7rem'}
			display={'flex'}
			alignItems={'center'}
			component={'section'}
			bgcolor={colors.primary[400]}
			borderRadius={5}
			px={4}
			py={2}
			mt={5}
		>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				width={'100%'}
			>
				<Typography variant="h3">{title}:</Typography>
				{children}
			</Box>
		</Box>
	);
};

export default Panel;
