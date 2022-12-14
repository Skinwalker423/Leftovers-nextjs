import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import NotificationList from './notificationList';

const NotificationMenu = () => {
	return (
		<Paper
			sx={{
				position: 'absolute',
				top: '90%',
				right: '4%',
				zIndex: 99,
				width: '300px',
				height: '300px',
			}}>
			<NotificationList />
		</Paper>
	);
};

export default NotificationMenu;
