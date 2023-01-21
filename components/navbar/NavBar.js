import React, { useContext, useState } from 'react';
import { Box, Typography, IconButton, Button, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useColors } from '../../hooks/useColors';
import { ColorModeContext } from '../../config/theme';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import UserMenu from '../UI/menu/UserMenu';
import NavItem from './NavItem.js/index.js';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationMenu from '../notifications/notificationMenu';
import styles from './NavBar.module.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MealCart from '../mealCart/mealCart';
import MenuIcon from '@mui/icons-material/Menu';
import CollapsedNavMenu from '../UI/menu/navMenu/collapsedNavMenu';

const NavBar = () => {
	const { data: session } = useSession();
	const userEmail = session?.user?.email;
	const userIcon = session?.user?.image;
	const userName = session?.user?.name;
	const { colors, palette } = useColors();
	const { toggleColorMode } = useContext(ColorModeContext);
	const [showUserMenu, setShowUserMenu] = useState();
	const [showNotifictions, setShowNotifications] = useState(false);
	const [showMealCart, setShowMealCart] = useState(false);

	const handleSignIn = () => {
		console.log('clicked sign in');
		signIn();
	};

	const handleDarkMode = () => {
		toggleColorMode();
	};

	const handleUserIcon = () => {
		setShowUserMenu((bool) => !bool);
		setShowNotifications(false);
	};

	const handleNotificationButton = () => {
		setShowNotifications((bool) => !bool);
		setShowUserMenu(false);
	};

	const handleMealCart = () => {
		setShowMealCart((bool) => !bool);
		setShowUserMenu(false);
		setShowNotifications(false);
	};

	const handleCollapsedNavBar = () => {
		console.log('nav menu opened');
		//create navbar menu
	};

	return (
		<Box
			padding='10px 20px'
			display='flex'
			position={'fixed'}
			justifyContent='space-between'
			alignItems='center'
			top='0'
			zIndex={99}
			backgroundColor={colors.primary[400]}
			width='100%'>
			<Box
				display='flex'
				width='50%'
				justifyContent={'space-between'}
				alignItems='center'>
				<Link href={'/'}>
					<Image
						src='/icons8-connect.svg'
						width={50}
						height={50}
						alt='Leftovers icon'
					/>
				</Link>
				<Box width={'500px'} className={styles.navBar}>
					<nav>
						<ul
							style={{
								listStyle: 'none',
								display: 'flex',
								justifyContent: 'space-evenly',
							}}>
							<NavItem title='Preppers' href='/preppers' />
							{session && <NavItem title='Favs' href='/favorites' />}
							<NavItem title='About' href='/about' />
							<NavItem title='MyKitchen' href='/mykitchen' />
						</ul>
					</nav>
				</Box>
				<Box className={styles.collapsedNavBar}>
					<CollapsedNavMenu />
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
					<Tooltip title='notifications'>
						<Box>
							<IconButton onClick={handleNotificationButton}>
								{showNotifictions ? (
									<NotificationsIcon />
								) : (
									<NotificationsNoneIcon />
								)}
							</IconButton>
						</Box>
					</Tooltip>
				)}
				<Tooltip title='meal cart'>
					<Box>
						<IconButton onClick={handleMealCart}>
							<ShoppingCartOutlinedIcon />
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
				{showNotifictions && <NotificationMenu />}
				{showMealCart && <MealCart setShowMealCart={setShowMealCart} />}
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
