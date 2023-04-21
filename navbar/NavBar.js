import React, { useContext, useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useColors } from '../../../hooks/useColors';
import { ColorModeContext } from '../../../config/theme';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import UserMenu from '../../UI/menu/UserMenu';
import NavItem from './NavItem.js/index.js';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationMenu from '../../notifications/notificationMenu';
import styles from './NavBar.module.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CollapsedNavMenu from '../../UI/menu/navMenu/collapsedNavMenu';
import MealCartDrawer from '../../UI/drawer/mealCartDrawer';
import DefaultAvatar from '../../UI/icon/defaultAvatar';

const NavBar = () => {
	const { data: session } = useSession();
	const userEmail = session?.user?.email;
	const userIcon = session?.user?.image;

	const { colors, palette } = useColors();
	const { toggleColorMode } = useContext(ColorModeContext);
	const [showUserMenu, setShowUserMenu] = useState();
	const [showNotifictions, setShowNotifications] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawer = (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setIsDrawerOpen((bool) => !bool);
		setShowUserMenu(false);
		setShowNotifications(false);
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

	return (
		<Box
			padding='10px 20px'
			display='flex'
			position={'fixed'}
			justifyContent='space-between'
			alignItems='center'
			height='5rem'
			top='0'
			zIndex={99}
			backgroundColor={colors.primary[400]}
			width='100%'>
			<Link href={'/'}>
				<Image
					src='/icons8-connect.svg'
					width={50}
					height={50}
					alt='Leftovers icon'
				/>
			</Link>
			<Box
				width={{ sm: '15rem', md: '35rem' }}
				height='3rem'
				className={styles.navBar}>
				<nav style={{ width: '100%' }}>
					<ul
						style={{
							listStyle: 'none',
							display: 'flex',
							justifyContent: 'space-evenly',
						}}>
						<NavItem title='Home' href='/' />
						<NavItem title='Preppers' href='/preppers' />
						{session && <NavItem title='Favs' href='/favorites' />}
						<NavItem title='About' href='/about' />
						{session ? (
							<NavItem title='MyKitchen' href='/myKitchen' />
						) : (
							<NavItem title='Register' href='/register' />
						)}
					</ul>
				</nav>
			</Box>
			<Box className={styles.collapsedNavBar}>
				<CollapsedNavMenu />
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
						<IconButton onClick={toggleDrawer}>
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
							{userIcon ? (
								<Image
									style={{ borderRadius: '50%' }}
									src={userIcon}
									width={25}
									height={25}
									alt='user icon'
								/>
							) : (
								<DefaultAvatar avatar userEmail={userEmail} />
							)}
						</IconButton>
					</Tooltip>
				)}
				{showUserMenu && <UserMenu />}
				{showNotifictions && <NotificationMenu />}

				<MealCartDrawer
					isDrawerOpen={isDrawerOpen}
					toggleDrawer={toggleDrawer}
				/>
				<Box>
					{!session && (
						<Link className={styles.link} href={'/signin'}>
							<Typography
								sx={{
									'&:hover': {
										borderBottom: `1px solid ${colors.orangeAccent[900]}`,
									},
								}}
								px='.5em'
								fontSize={'large'}
								variant='button'
								color={colors.orangeAccent[900]}>
								Sign In
							</Typography>
						</Link>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default NavBar;