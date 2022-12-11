import React from 'react';
import { Box, Typography, IconButton, Button, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useColors } from '../../hooks';

const NavBar = () => {
	const { data: session } = useSession();
	console.log(session);
	const userEmail = session?.user?.email;
	const userIcon = session?.user?.image;
	const userName = session?.user?.name;
	const { colors } = useColors();

	const handleSignIn = () => {
		console.log('clicked sign in');
		signIn();
	};
	const handleSignOut = () => {
		console.log('clicked sign out');
		signOut();
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
						src='https://img.icons8.com/material-rounded/48/000000/share-2.png'
						width={50}
						height={50}
					/>
				</Link>
			</Box>
			<Box display='flex' alignItems='center'>
				{session && (
					<Tooltip
						title={
							<Box>
								<Typography>{userEmail}</Typography>
								<Typography>{userName}</Typography>
							</Box>
						}>
						<IconButton>
							<Image src={userIcon} width={30} height={30} />
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
