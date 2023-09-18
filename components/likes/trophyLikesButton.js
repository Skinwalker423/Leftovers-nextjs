import React from 'react';
import { Box, IconButton, Typography, Tooltip, Paper } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useColors } from '../../hooks/useColors';

const TrophyLikesButton = ({ mealsServed }) => {
	const { colors } = useColors();
	return (
		<Tooltip title={<h3>Meals Served</h3>}>
			<Box
				backgroundColor={colors.primary[400]}
				sx={{
					display: 'flex',
					alignItems: 'center',
					px: 4,
					py: 2,
					borderRadius: 5
				}}
			>
				<WorkspacePremiumIcon color="error" fontSize="large" />
				<Typography color={colors.orangeAccent[900]} fontSize={'x-large'}>
					{mealsServed}
				</Typography>
			</Box>
		</Tooltip>
	);
};

export default TrophyLikesButton;
