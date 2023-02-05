import React from 'react';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useColors } from '../../../hooks/useColors';

const DefaultAvatar = ({ firstEmailLetter, avatar }) => {
	const { colors } = useColors();
	return (
		<Box
			width={avatar ? 35 : 50}
			height={avatar ? 35 : 50}
			borderRadius='50%'
			backgroundColor={colors.orangeAccent[900]}
			border={`2px solid ${colors.orangeAccent[200]}`}
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<Typography sx={{ color: colors.primary[100] }}>
				{firstEmailLetter ? (
					firstEmailLetter
				) : (
					<AccountCircleIcon fontSize='large' />
				)}
			</Typography>
		</Box>
	);
};

export default DefaultAvatar;
