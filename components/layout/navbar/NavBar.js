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
import { useUserContext } from '../../../hooks/useUserContext';

const NavBar = () => {
	const { data: session } = useSession();
	const userEmail = session?.user?.email;
	const userIcon = session?.user?.image;

	const { colors, palette } = useColors();
	const { toggleColorMode } = useContext(ColorModeContext);
	const [showUserMenu, setShowUserMenu] = useState();
	const [showNotifictions, setShowNotifications] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { state } = useUserContext();

	const cartItemsLength = state.userCartlist.length;

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
			display="flex"
			position={'fixed'}
			height="5rem"
			top={0}
			zIndex={99}
			backgroundColor={colors.primary[400]}
			width="100%"
		>
			<Box
				width="100%"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				px={2}
			>
				<Link href={'/'}>
					<Image
						src="/icons8-connect.svg"
						width={50}
						height={50}
						alt="Leftovers icon"
					/>
				</Link>
				<Box
					display={{ xs: 'none', md: 'unset' }}
					width={{ sm: '15rem', md: '35rem' }}
					height="3rem"
				>
					<nav style={{ width: '100%' }}>
						<ul
							style={{
								listStyle: 'none',
								display: 'flex',
								justifyContent: 'space-evenly'
							}}
						>
							<NavItem title="Home" href="/" />
							<NavItem title="Preppers" href="/preppers" />
							{session && <NavItem title="Favs" href="/favorites" />}
							<NavItem title="About" href="/about" />

							<NavItem title="MyKitchen" href="/myKitchen" />

							<NavItem title="Register" href="/register" />
						</ul>
					</nav>
				</Box>
				<Box display={{ md: 'none' }}>
					<CollapsedNavMenu />
				</Box>

				<Box display="flex" alignItems="center">
					<Tooltip title="darkmode">
						<Box>
							<IconButton onClick={handleDarkMode}>
								{palette.mode === 'light' ? (
									<DarkModeOutlinedIcon fontSize="large" />
								) : (
									<DarkModeIcon fontSize="large" />
								)}
							</IconButton>
						</Box>
					</Tooltip>
					{session && (
						<Tooltip title="notifications">
							<Box>
								<IconButton onClick={handleNotificationButton}>
									{showNotifictions ? (
										<NotificationsIcon fontSize="large" />
									) : (
										<NotificationsNoneIcon fontSize="large" />
									)}
								</IconButton>
							</Box>
						</Tooltip>
					)}
					<Tooltip title="meal cart">
						<Box position={'relative'}>
							<IconButton onClick={toggleDrawer}>
								<ShoppingCartOutlinedIcon fontSize="large" />
							</IconButton>
							{cartItemsLength > 0 && (
								<Box
									position={'absolute'}
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									bottom={0}
									left={2}
									borderRadius={5}
									backgroundColor={colors.orangeAccent[400]}
									width={'1.5em'}
									height={'1.5em'}
								>
									<Typography color={colors.primary[900]}>
										{cartItemsLength}
									</Typography>
								</Box>
							)}
						</Box>
					</Tooltip>
					{session && (
						<Tooltip
							placement={showUserMenu ? 'left' : 'bottom'}
							title={
								<Box>
									<Typography>{userEmail}</Typography>
								</Box>
							}
						>
							<IconButton onClick={handleUserIcon}>
								{userIcon ? (
									<Image
										style={{ borderRadius: '50%' }}
										src={userIcon}
										width={40}
										height={40}
										alt="user icon"
									/>
								) : (
									<DefaultAvatar avatar userEmail={userEmail} />
								)}
							</IconButton>
						</Tooltip>
					)}
					{showUserMenu && <UserMenu setShowUserMenu={setShowUserMenu} />}
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
											borderBottom: `1px solid ${colors.orangeAccent[900]}`
										}
									}}
									px=".5em"
									fontSize={'large'}
									variant="button"
									color={'secondary'}
								>
									Sign In
								</Typography>
							</Link>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default NavBar;
