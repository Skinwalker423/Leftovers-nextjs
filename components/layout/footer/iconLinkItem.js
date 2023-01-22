import React from 'react';
import { IconButton } from '@mui/material';

const IconLinkItem = ({ children, link }) => {
	return (
		<a target='_blank' rel='noopener noreferrer' href={link}>
			<IconButton>{children}</IconButton>
		</a>
	);
};

export default IconLinkItem;
