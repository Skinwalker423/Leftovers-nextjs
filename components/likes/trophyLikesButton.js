import React from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const TrophyLikesButton = ({ counter = 23 }) => {
	return (
		<Tooltip title='Meals Served'>
			<Box display={'flex'} alignItems='center'>
				<IconButton>
					<WorkspacePremiumIcon color='error' fontSize='large' />
				</IconButton>
				<Typography fontSize={'large'}>{counter}</Typography>
			</Box>
		</Tooltip>
	);
};

export default TrophyLikesButton;
