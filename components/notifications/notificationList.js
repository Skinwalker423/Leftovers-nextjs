import React from 'react';
import { Box, MenuList } from '@mui/material';
import NotificationItem from './notificationItem';

const NotificationList = ({ list }) => {
	if (!list) return;

	return (
		<Box
			height={'85%'}
			width="100%"
			sx={{ overflowY: 'auto', textDecoration: 'none' }}
		>
			<MenuList>
				{list.map(({ name, email, id }) => {
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
