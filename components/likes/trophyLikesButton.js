import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const TrophyLikesButton = ({ counter = 23 }) => {
	return (
		<Box display={'flex'} alignItems='center'>
			<IconButton>
				<WorkspacePremiumIcon color='error' fontSize='large' />
			</IconButton>
			<Typography fontSize={'large'}>{counter}</Typography>
		</Box>
	);
};

export default TrophyLikesButton;
