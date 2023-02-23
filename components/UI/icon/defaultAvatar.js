import React from 'react';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useColors } from '../../../hooks/useColors';

const DefaultAvatar = ({
	userEmail,
	avatar,
	widthHeight = 50,
	fontSize = 'large',
}) => {
	const { colors } = useColors();
	const firstEmailLetter = userEmail[0];
	return (
		<Box
			width={avatar ? 35 : widthHeight}
			height={avatar ? 35 : widthHeight}
			borderRadius='50%'
			backgroundColor={colors.orangeAccent[900]}
			border={`2px solid ${colors.orangeAccent[200]}`}
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<Typography fontSize={fontSize} sx={{ color: colors.primary[100] }}>
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
