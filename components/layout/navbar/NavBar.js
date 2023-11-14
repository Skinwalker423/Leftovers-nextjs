import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, Typography, IconButton, Tooltip, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import logo from '../../../public/icons8-connect.svg';
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

import UpdateDefaultZipcodeForm from '../../UI/form/user/updateDefaultZipcode';

const NavBar = () => {
	const { data: session } = useSession();
	const userEmail = session?.user?.email;
	const userIcon = session?.user?.image;
	const isPrepper = session?.user?.isPrepper;

	const { colors, palette } = useColors();
	const { toggleColorMode } = useContext(ColorModeContext);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [showNotifictions, setShowNotifications] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { state } = useUserContext();
	const userMenuRef = useRef();
	const userMenuIconRef = useRef();

	useEffect(() => {
		const closeUserModal = (e) => {
			if (
				userMenuIconRef?.current &&
				userMenuIconRef.current.contains(e.target)
			)
				return;
			if (showUserMenu && userMenuRef.current) {
				if (!userMenuRef.current.contains(e.target)) {
					setShowUserMenu(false);
				}
			}
		};
		document.addEventListener('click', closeUserModal);

		return () => {
			document.removeEventListener('click', closeUserModal);
		};
	}, [showUserMenu]);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const mediumMatches = useMediaQuery(theme.breakpoints.down('md'));
	const largeMatches = useMediaQuery(theme.breakpoints.down('lg'));

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
			width="100vw"
			px={3}
		>
			<Box
				width="100%"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Link className={styles.logoText} href={'/'}>
					<Image src={logo} width={50} height={50} alt="Leftovers icon" />
					{!mediumMatches && (
						<Typography
							className={styles.logoText}
							variant="h2"
							color={'secondary'}
						>
							Leftovers
						</Typography>
					)}
				</Link>

				<Box display="flex" alignItems="center">
					{largeMatches ? (
						<CollapsedNavMenu />
					) : (
						<Box>
							<nav style={{ width: '100%' }}>
								<ul className={styles.linkListContainer}>
									<NavItem title="Home" href="/" />
									<NavItem title="Preppers" href="/preppers" />
									{session && <NavItem title="Favs" href="/favorites" />}
									<NavItem title="About" href="/about" />

									{isPrepper ? (
										<NavItem title="MyKitchen" href="/myKitchen" />
									) : (
										<NavItem title="Register" href="/register" />
									)}
								</ul>
							</nav>
						</Box>
					)}
					{session && <UpdateDefaultZipcodeForm />}

					<Tooltip title="darkmode">
						<Box>
							<IconButton
								size={matches ? 'small' : 'large'}
								onClick={handleDarkMode}
							>
								{palette.mode === 'light' ? (
									<DarkModeOutlinedIcon
										fontSize={matches ? 'medium' : 'large'}
									/>
								) : (
									<DarkModeIcon fontSize={matches ? 'medium' : 'large'} />
								)}
							</IconButton>
						</Box>
					</Tooltip>
					{session && (
						<Tooltip title="notifications">
							<Box>
								<IconButton
									size={matches ? 'small' : 'large'}
									onClick={handleNotificationButton}
								>
									{showNotifictions ? (
										<NotificationsIcon
											fontSize={matches ? 'medium' : 'large'}
										/>
									) : (
										<NotificationsNoneIcon
											fontSize={matches ? 'medium' : 'large'}
										/>
									)}
								</IconButton>
							</Box>
						</Tooltip>
					)}
					<Tooltip title="meal cart">
						<Box position={'relative'}>
							<IconButton
								size={matches ? 'small' : 'large'}
								onClick={toggleDrawer}
							>
								<ShoppingCartOutlinedIcon
									fontSize={matches ? 'medium' : 'large'}
								/>
								{cartItemsLength > 0 && (
									<Box
										position={'absolute'}
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
										bottom={-3}
										left={2}
										p={1}
										borderRadius={5}
										backgroundColor={colors.orangeAccent[400]}
										width={'1.1em'}
										height={'1.1em'}
									>
										<Typography
											sx={{ fontSize: 'small' }}
											color={colors.primary[900]}
										>
											{cartItemsLength}
										</Typography>
									</Box>
								)}
							</IconButton>
						</Box>
					</Tooltip>
					{session ? (
						<Tooltip
							placement={showUserMenu ? 'left' : 'bottom'}
							title={
								<Box>
									<Typography>{userEmail}</Typography>
								</Box>
							}
						>
							<IconButton ref={userMenuIconRef} onClick={handleUserIcon}>
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
					) : (
						<Box>
							{
								<Link className={styles.link} href={'/signin'}>
									<Typography
										sx={{
											'&:hover': {
												borderBottom: `2px solid ${colors.orangeAccent[300]}`,
												color: colors.orangeAccent[300]
											}
										}}
										px=".5em"
										pb={0.75}
										fontSize={'large'}
										variant="button"
										color={'secondary'}
									>
										Sign In
									</Typography>
								</Link>
							}
						</Box>
					)}
					{showUserMenu && (
						<Box position={'absolute'} top={30} right={0} ref={userMenuRef}>
							<UserMenu setShowUserMenu={setShowUserMenu} />
						</Box>
					)}
					{showNotifictions && <NotificationMenu />}

					<MealCartDrawer
						isDrawerOpen={isDrawerOpen}
						toggleDrawer={toggleDrawer}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default NavBar;
