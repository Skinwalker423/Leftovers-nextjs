import React from 'react';
import Link from 'next/link';
import { Box, MenuList, Typography } from '@mui/material';
import { mockDataTeam } from '../../db/mockData';
import styles from './notificationList.module.css';
import NotificationItem from './notificationItem';

const NotificationList = () => {
	return (
		<Box className={styles.list}>
			<Typography
				sx={{
					height: '3em',
					pt: '1em',
				}}
				variant='h2'
				textAlign={'center'}
				borderBottom='1px solid black'>
				Messages
			</Typography>
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
