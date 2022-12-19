import React, { useContext, useState } from 'react';
import { Box, Typography, IconButton, Button, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useColors } from '../../hooks/useColors';
import { ColorModeContext } from '../../config/theme';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import UserMenu from '../UserMenu';
import NavItem from '../NavItem.js';

const NavBar = () => {
	const { data: session } = useSession();
	const userEmail = session?.user?.email;
	const userIcon = session?.user?.image;
	const userName = session?.user?.name;
	const { colors, palette } = useColors();
	const { toggleColorMode } = useContext(ColorModeContext);
	const [showUserMenu, setShowUserMenu] = useState();

	const handleSignIn = () => {
		console.log('clicked sign in');
		signIn();
	};

	const handleDarkMode = () => {
		toggleColorMode();
	};

	const handleUserIcon = () => {
		setShowUserMenu((bool) => !bool);
	};

	return (
		<Box
			padding='10px 20px'
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			position='fixed'
			top='0'
			zIndex={99}
			backgroundColor={colors.primary[400]}
			width='100%'>
			<Box display='flex' width='50%' justifyContent={'space-between'}>
				<Link href={'/'}>
					<Image
						src='/icons8-connect.svg'
						width={50}
						height={50}
						alt='Leftovers icon'
					/>
				</Link>
				<Box>
					<nav>
						<ul
							style={{
								listStyle: 'none',
								display: 'flex',
							}}>
							<NavItem title='Preppers' href='/preppers' />
							<NavItem title='My Favs' href='/' />
							<NavItem title='About' href='/about' />
						</ul>
					</nav>
				</Box>
			</Box>
			<Box display='flex' alignItems='center'>
				<Tooltip title='darkmode'>
					<Box>
						<IconButton onClick={handleDarkMode}>
							{palette.mode === 'light' ? (
								<DarkModeOutlinedIcon />
							) : (
								<DarkModeIcon />
							)}
						</IconButton>
					</Box>
				</Tooltip>
				{session && (
					<Tooltip
						placement={showUserMenu ? 'left' : 'bottom'}
						title={
							<Box>
								<Typography>{userEmail}</Typography>
							</Box>
						}>
						<IconButton onClick={handleUserIcon}>
							<Image
								style={{ borderRadius: '50%' }}
								src={userIcon}
								width={25}
								height={25}
								alt='user icon'
							/>
						</IconButton>
					</Tooltip>
				)}
				{showUserMenu && <UserMenu />}
				<Box>
					{!session && (
						<Button onClick={handleSignIn}>
							<Typography color={colors.orangeAccent[900]}>Sign In</Typography>
						</Button>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default NavBar;
