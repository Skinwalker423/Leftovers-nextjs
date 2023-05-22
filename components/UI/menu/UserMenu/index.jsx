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

const UserMenu = () => {
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
				<Link style={{ textDecoration: 'none' }} href={'/'}>
					<MenuItem
						sx={{
							height: '4em',
							pl: '2.5em',
							justifyContent: 'flex-start',
							alignItems: 'center',
							gap: 5
						}}
					>
						<AccountCircle fontSize="large" color="secondary" />
						<Typography color={colors.primary[100]} fontSize={'large'}>
							Profile
						</Typography>
					</MenuItem>
				</Link>
				<Link style={{ textDecoration: 'none' }} href={'/messages'}>
					<MenuItem
						sx={{
							height: '4em',
							pl: '2.5em',
							justifyContent: 'flex-start',
							alignItems: 'center',
							gap: 5
						}}
					>
						<MailIcon fontSize="large" color="secondary" />
						<Typography color={colors.primary[100]} fontSize={'large'}>
							Messages
						</Typography>
					</MenuItem>
				</Link>
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
