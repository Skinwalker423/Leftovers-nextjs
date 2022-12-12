import React, { useContext } from 'react';
import { Box, Typography, IconButton, Button, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useColors } from '../../hooks';
import { ColorModeContext } from '../../config/theme';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const NavBar = () => {
	const { data: session } = useSession();
	const userEmail = session?.user?.email;
	const userIcon = session?.user?.image;
	const userName = session?.user?.name;
	const { colors, palette } = useColors();
	const { toggleColorMode } = useContext(ColorModeContext);

	const handleSignIn = () => {
		console.log('clicked sign in');
		signIn();
	};
	const handleSignOut = () => {
		console.log('clicked sign out');
		signOut();
	};

	const handleDarkMode = () => {
		toggleColorMode();
	};

	return (
		<Box
			padding='10px 50px'
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			position='fixed'
			top='0'
			width='100%'>
			<Box>
				<Link href={'/'}>
					<Image
						src='/icons8-connect.svg'
						width={50}
						height={50}
						alt='Leftovers icon'
					/>
				</Link>
			</Box>
			<Box display='flex' alignItems='center'>
				<Box>
					<IconButton onClick={handleDarkMode}>
						{palette.mode === 'light' ? (
							<DarkModeOutlinedIcon />
						) : (
							<DarkModeIcon />
						)}
					</IconButton>
				</Box>
				{session && (
					<Tooltip
						title={
							<Box>
								<Typography>{userEmail}</Typography>
								<Typography>{userName}</Typography>
							</Box>
						}>
						<IconButton>
							<Image src={userIcon} width={30} height={30} alt='user icon' />
						</IconButton>
					</Tooltip>
				)}
				<Box>
					{session ? (
						<Button onClick={handleSignOut}>Sign Out</Button>
					) : (
						<Button onClick={handleSignIn}>Sign In</Button>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default NavBar;
