import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import NotificationList from './notificationList';
import Link from 'next/link';
import { useColors } from '../../hooks/useColors';

const NotificationMenu = () => {
	const { colors } = useColors();
	return (
		<Paper
			sx={{
				position: 'absolute',
				top: '90%',
				right: '4%',
				zIndex: 99,
				width: '500px',
				height: '500px',
			}}>
			<Box py={'1em'} backgroundColor={colors.gray[700]}>
				<Typography variant='h2' textAlign={'center'}>
					Messages
				</Typography>
			</Box>
			<NotificationList />
			<Box py='1em' backgroundColor={colors.gray[400]}>
				<Link style={{ textDecoration: 'none' }} href={'/messages'}>
					<Typography
						color={colors.orangeAccent[900]}
						variant='h3'
						textAlign={'center'}>
						See all
					</Typography>
				</Link>
			</Box>
		</Paper>
	);
};

export default NotificationMenu;
