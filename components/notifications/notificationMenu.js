import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NotificationMenu = () => {
	return (
		<Paper
			sx={{
				position: 'absolute',
				top: '90%',
				right: '4%',
				zIndex: 99,
				width: '200px',
				height: '200px',
			}}>
			Messages
		</Paper>
	);
};

export default NotificationMenu;
