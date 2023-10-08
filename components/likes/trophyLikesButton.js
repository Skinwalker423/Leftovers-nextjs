import React from 'react';
import {
	Box,
	IconButton,
	Typography,
	Tooltip,
	Paper,
	useTheme,
	useMediaQuery
} from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useColors } from '../../hooks/useColors';

const TrophyLikesButton = ({ mealsServed }) => {
	const { colors } = useColors();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.only('sm'));

	let awardColor = 'primary';

	if (mealsServed >= 40) {
		awardColor = 'secondary';
	} else if (mealsServed >= 20) {
		awardColor = 'error';
	} else if (mealsServed >= 10) {
		awardColor = 'info';
	} else {
		awardColor = 'primary';
	}

	return (
		<Tooltip title={<h3>Meals Served</h3>}>
			<Box
				backgroundColor={colors.primary[400]}
				sx={{
					display: 'flex',
					alignItems: 'center',
					px: { xs: 1, sm: 2 },
					py: 1,
					borderRadius: 5
				}}
			>
				<WorkspacePremiumIcon
					color={awardColor}
					fontSize={matches ? 'small' : 'large'}
				/>
				<Typography
					color={colors.orangeAccent[900]}
					fontSize={matches ? 'medium' : 'x-large'}
				>
					{mealsServed}
				</Typography>
			</Box>
		</Tooltip>
	);
};

export default TrophyLikesButton;
