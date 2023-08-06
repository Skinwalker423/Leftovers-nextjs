import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useColors } from '../../../../hooks/useColors';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import DefaultAvatar from '../../icon/defaultAvatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const UserMenu = ({ setShowUserMenu }) => {
	const { colors } = useColors();
	const { data: session } = useSession();

	if (!session) {
		return;
	}

	const userIcon = session?.user?.image;
	const userEmail = session?.user?.email;
	const userName = session?.user?.name;

	const handleSignOut = () => {
		signOut();
	};

	const linkListConfig = [
		{
			label: 'Profile',
			href: '/',
			icon: <AccountCircle fontSize="large" color="secondary" />
		},
		{
			label: 'Messages',
			href: '/messages',
			icon: <MailIcon fontSize="large" color="secondary" />
		},
		{
			label: 'My Orders',
			href: '/myorders',
			icon: <RestaurantIcon fontSize="large" color="secondary" />
		}
	];

	const linkList = linkListConfig.map(({ label, href, icon }) => {
		return (
			<Link
				onClick={() => setShowUserMenu(false)}
				key={label}
				style={{ textDecoration: 'none' }}
				href={href}
			>
				<MenuItem
					sx={{
						height: '4em',
						pl: '2.5em',
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: 5
					}}
				>
					{icon}
					<Typography color={colors.primary[100]} fontSize={'large'}>
						{label}
					</Typography>
				</MenuItem>
			</Link>
		);
	});

	return (
		<Paper
			sx={{
				position: 'absolute',
				mr: '1.5em',
				top: 70,
				right: 0,
				width: '20rem',
				borderRadius: '1em'
			}}
		>
			<Box
				display={'flex'}
				flexDirection="column"
				justifyContent={'center'}
				alignItems="center"
				m={'1.5em 0'}
			>
				{userIcon ? (
					<Box>
						<Image
							style={{ borderRadius: '50%' }}
							src={userIcon}
							width={50}
							height={50}
							alt="user icon"
						/>
					</Box>
				) : (
					<DefaultAvatar userEmail={userEmail} />
				)}
				<Box color={colors.primary[100]}>
					<Typography>{userEmail}</Typography>
				</Box>
			</Box>
			<Divider flexItem variant="middle" color={colors.orangeAccent[900]} />
			<MenuList>
				{linkList}
				<MenuItem
					onClick={handleSignOut}
					sx={{
						height: '4em',
						pl: '2.5em',
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: 5
					}}
				>
					<LogoutIcon fontSize="large" color="secondary" />
					<Typography color={colors.primary[100]} fontSize={'large'}>
						Sign Out
					</Typography>
				</MenuItem>
			</MenuList>
		</Paper>
	);
};

export default UserMenu;
