import React from 'react';
import Link from 'next/link';
import styles from './notificationItem.module.css';
import { Box, MenuItem, Stack, Typography } from '@mui/material';

const NotificationItem = ({ name, id, email, message = "hey, what's up?" }) => {
	return (
		<Link key={id} className={styles.link} href={`/messages/${id}`}>
			<MenuItem className={styles.listItem}>
				<Stack>
					<Box display={'flex'} justifyContent='space-between'>
						<Typography>{name}</Typography>
						<Typography>{email}</Typography>
					</Box>
					<Typography>{message}</Typography>
				</Stack>
			</MenuItem>
		</Link>
	);
};

export default NotificationItem;
