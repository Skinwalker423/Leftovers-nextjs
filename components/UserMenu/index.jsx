import React from 'react';
import { Box, Typography, MenuList, MenuItem, Paper } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import { signOut } from 'next-auth/react';
// import MenuItem from './MenuItem';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const UserMenu = () => {
	const { colors } = useColors();
	const { data: session } = useSession();
	const userIcon = session.user.image;
	const userEmail = session.user.email;
	const userName = session.user.name;

	const handleSignOut = () => {
		console.log('clicked sign out');
		signOut();
	};

	return (
		<Paper
			sx={{
				position: 'absolute',
				mr: '20px',
				top: '70px',
				right: '0',
				width: '15rem',
			}}>
			<Box
				display={'flex'}
				flexDirection='column'
				justifyContent={'center'}
				alignItems='center'
				m={'20px 0'}>
				<Box>
					<Image
						style={{ borderRadius: '50%' }}
						src={userIcon}
						width={50}
						height={50}
						alt='user icon'
					/>
				</Box>
				<Box color={colors.primary[100]}>
					<Typography>{userEmail}</Typography>
				</Box>
				<Box color={colors.primary[100]}>
					<Typography>{userName}</Typography>
				</Box>
			</Box>
			<MenuList>
				<MenuItem sx={{ height: '50px', justifyContent: 'center' }}>
					Profile
				</MenuItem>
				<MenuItem sx={{ height: '50px', justifyContent: 'center' }}>
					<Link
						style={{ textDecoration: 'none', color: colors.primary[100] }}
						href={'/toDoList'}>
						To-Do List
					</Link>
				</MenuItem>
				<MenuItem
					sx={{ height: '50px', justifyContent: 'center' }}
					onClick={handleSignOut}>
					Logout
				</MenuItem>
			</MenuList>
		</Paper>
	);
};

export default UserMenu;
