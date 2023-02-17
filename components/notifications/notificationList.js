import React from 'react';
import Link from 'next/link';
import { Box, MenuList, Typography } from '@mui/material';
import { mockDataTeam } from '../../db/mockData';
import styles from './notificationList.module.css';
import NotificationItem from './notificationItem';

const NotificationList = () => {
	return (
		<Box
			height={'85%'}
			width='100%'
			sx={{ overflowY: 'auto', textDecoration: 'none' }}>
			<MenuList>
				{mockDataTeam.map(({ name, email, id }) => {
					return (
						<NotificationItem
							key={id}
							email={email}
							name={name}
							message={'hey what up'}
							id={id}
						/>
					);
				})}
			</MenuList>
		</Box>
	);
};

export default NotificationList;
