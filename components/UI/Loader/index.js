import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const CustomLoader = ({
	title = '',
	color = 'success',
	progress = 0,
	size = 40,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<CircularProgress color={color} size={size} value={progress} />
			<Typography sx={{ mt: '20px' }}>{title}</Typography>
		</Box>
	);
};

export default CustomLoader;
