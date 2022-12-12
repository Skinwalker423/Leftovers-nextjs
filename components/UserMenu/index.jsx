import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useColors } from '../../hooks';
import { signOut } from 'next-auth/react';

const UserMenu = () => {
	const { colors } = useColors();

	const handleSignOut = () => {
		console.log('clicked sign out');
		signOut();
	};

	return (
		<Box
			position={'fixed'}
			mr='10px'
			top={'70px'}
			right={'0'}
			width='200px'
			borderRadius='4px'
			boxShadow={3}
			backgroundColor={colors.primary[100]}>
			<Box width='100%' borderBottom={`1px solid ${colors.orangeAccent[900]}`}>
				<Button sx={{ width: '100%' }}>
					<Typography color={colors.primary[900]}>Profile</Typography>
				</Button>
			</Box>
			<Box width='100%' borderBottom={`1px solid ${colors.orangeAccent[900]}`}>
				<Button onClick={handleSignOut} sx={{ width: '100%' }}>
					<Typography color={colors.primary[900]}>Sign Out</Typography>
				</Button>
			</Box>
		</Box>
	);
};

export default UserMenu;
