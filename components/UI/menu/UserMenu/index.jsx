import React from 'react';
import {
	Box,
	Typography,
	MenuList,
	MenuItem,
	Paper,
	Divider
} from '@mui/material';
import { useColors } from '../../../../hooks/useColors';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import DefaultAvatar from '../../icon/defaultAvatar';

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
				m={'20px 0'}
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
				<MenuItem sx={{ height: '4em', justifyContent: 'center' }}>
					Profile
				</MenuItem>
				<Link
					style={{ textDecoration: 'none', color: colors.primary[100] }}
					href={'/messages'}
				>
					<MenuItem sx={{ height: '4em', justifyContent: 'center' }}>
						Messages
					</MenuItem>
				</Link>
				<MenuItem
					sx={{ height: '4em', justifyContent: 'center' }}
					onClick={handleSignOut}
				>
					Logout
				</MenuItem>
			</MenuList>
		</Paper>
	);
};

export default UserMenu;
