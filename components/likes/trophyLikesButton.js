import React from 'react';
import { Box, IconButton, Typography, Tooltip, Paper } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useColors } from '../../hooks/useColors';

const TrophyLikesButton = ({ counter = 23 }) => {
	const { colors } = useColors();
	return (
		<Tooltip title="Meals Served">
			<Box
				backgroundColor={colors.primary[400]}
				sx={{ display: 'flex', alignItems: 'center', px: '1em' }}
			>
				<WorkspacePremiumIcon color="error" fontSize="large" />
				<Typography color={colors.orangeAccent[900]} fontSize={'large'}>
					{counter}
				</Typography>
			</Box>
		</Tooltip>
	);
};

export default TrophyLikesButton;
