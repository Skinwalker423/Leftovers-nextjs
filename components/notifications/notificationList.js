import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { mockDataTeam } from '../../db/mockData';
import styles from './notificationList.module.css';
import NotificationItem from './notificationItem';

const NotificationList = () => {
	return (
		<Box className={styles.list}>
			<Typography
				variant='h3'
				textAlign={'center'}
				borderBottom='1px solid black'>
				Messages
			</Typography>
			<ul>
				{mockDataTeam.map(({ name, email, id }) => {
					return (
						<NotificationItem
							key={id}
							email={email}
							name={name}
							message={'hey what up'}
							id={id}
						/>
						// <Link key={id} className={styles.link} href={`/messages/${id}`}>
						// 	<li className={styles.listItem}>
						// 		<p>{name}</p>
						// 		<p>{email}</p>
						// 	</li>
						// </Link>
					);
				})}
			</ul>
		</Box>
	);
};

export default NotificationList;
