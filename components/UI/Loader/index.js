import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const CustomLoader = ({
	title = '',
	color = 'success',
	progress = 0,
	size = 40
}) => {
	return (
		<Box zIndex={100} position={'fixed'} top={'60%'} left={'50%'}>
			<CircularProgress color={color} size={size} value={progress} />
			<Typography sx={{ mt: '1rem' }}>{title}</Typography>
		</Box>
	);
};

export default CustomLoader;
