import React from 'react';
import Link from 'next/link';
import styles from './notificationItem.module.css';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';

const NotificationItem = ({ name, email, message = "hey, what's up?", id }) => {
	const { colors } = useColors();
	return (
		<Link className={styles.link} href={`/messages/${id}`}>
			<MenuItem
				sx={{
					height: '10em',
					listStyle: 'none',
					borderBottom: `1px solid ${colors.orangeAccent[900]}`,
				}}>
				<Box width={'100%'} display='flex' justifyContent={'space-between'}>
					<Box display={'flex'} flexDirection='column'>
						<Typography color={colors.primary[100]}>{name}</Typography>
						<Typography color={colors.orangeAccent[900]}>{email}</Typography>
					</Box>
					<Typography color={colors.primary[100]}>{message}</Typography>
				</Box>
			</MenuItem>
		</Link>
	);
};

export default NotificationItem;
