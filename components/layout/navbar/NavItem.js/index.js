import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { useColors } from '../../../../hooks/useColors';
import styles from './index.module.css';

const NavItem = ({ title = 'nav item', href = '/' }) => {
	const { colors } = useColors();
	return (
		<Link
			className={styles.navLink}
			style={{
				textDecoration: 'none',
				padding: '0 1em',
			}}
			href={href}>
			<li>
				<Typography color={colors.orangeAccent[900]} variant='h4'>
					{title}
				</Typography>
			</li>
		</Link>
	);
};

export default NavItem;
