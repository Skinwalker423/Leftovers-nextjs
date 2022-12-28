import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { useColors } from '../../../hooks/useColors';

const NavItem = ({ title = 'nav item', href = '/' }) => {
	const { colors } = useColors();
	return (
		<Link style={{ textDecoration: 'none', padding: '0 10px' }} href={href}>
			<li>
				<Typography color={colors.orangeAccent[900]} variant='h4'>
					{title}
				</Typography>
			</li>
		</Link>
	);
};

export default NavItem;
