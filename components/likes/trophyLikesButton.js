import React from 'react';
import { Box, IconButton, Typography, Tooltip, Paper } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const TrophyLikesButton = ({ counter = 23 }) => {
	return (
		<Tooltip title="Meals Served">
			<Paper sx={{ display: 'flex', alignItems: 'center', px: '1em' }}>
				<IconButton>
					<WorkspacePremiumIcon color="error" fontSize="large" />
				</IconButton>
				<Typography color={'orange'} fontSize={'large'}>
					{counter}
				</Typography>
			</Paper>
		</Tooltip>
	);
};

export default TrophyLikesButton;
