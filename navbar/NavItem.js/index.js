import React from 'react';
import Link from 'next/link';
import Typography  from '@mui/material/Typography';
import Box  from '@mui/material/Box';
import { useColors } from '../../../../hooks/useColors';
import styles from './index.module.css';
import { useRouter } from 'next/router';

const NavItem = ({ title = 'nav item', href = '/' }) => {
	const { colors } = useColors();
	const router = useRouter();

	const currentPage =
		href === router.asPath ? `2px solid ${colors.orangeAccent[900]}` : '';

	return (
		
		<Link
			className={styles.navLink}
			href={href}>
			<Box borderBottom={currentPage} >
			<li>
				<Typography color={colors.orangeAccent[900]} variant='h4'>
					{title}
				</Typography>
			</li>
			</Box>
		</Link>
	);
};

export default NavItem;
