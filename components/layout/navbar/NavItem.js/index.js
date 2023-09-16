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
		(router.asPath.includes(href) && href !== '/') || href === router.asPath;

	return (
		<li className={styles.navLinkContainer}>
			<Link className={styles.navLink} href={href}>
				<Box
					width={'100%'}
					height={'2.5rem'}
					py={1}
					sx={{
						':hover': {
							borderBottom: `2px solid ${colors.orangeAccent[300]}`
						}
					}}
					borderBottom={
						currentPage ? `2px solid ${colors.orangeAccent[300]}` : ''
					}
				>
					<Typography
						sx={{
							':hover': {
								color: colors.orangeAccent[300]
							}
						}}
						color={currentPage ? colors.orangeAccent[300] : 'secondary'}
						variant="h4"
					>
						{title}
					</Typography>
				</Box>
			</Link>
		</li>
	);
};

export default NavItem;
