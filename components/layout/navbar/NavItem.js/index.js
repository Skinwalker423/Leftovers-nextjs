import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useColors } from '../../../../hooks/useColors';
import styles from './index.module.css';
import { useRouter } from 'next/router';

const NavItem = ({ title = 'nav item', href = '/' }) => {
	const { colors } = useColors();
	const router = useRouter();

	const currentPage =
		(router.asPath.includes(href) && href !== '/') || href === router.asPath
			? `2px solid ${colors.orangeAccent[900]}`
			: '';

	return (
		<li>
			<Link className={styles.navLink} href={href}>
				<Box
					width={'100%'}
					pb={1}
					sx={{
						':hover': {
							borderBottom: `2px solid ${colors.orangeAccent[900]}`
						}
					}}
					borderBottom={currentPage}
				>
					<Typography color={'secondary'} variant="h4">
						{title}
					</Typography>
				</Box>
			</Link>
		</li>
	);
};

export default NavItem;
