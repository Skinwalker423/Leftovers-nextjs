import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import styles from './copyright.module.css';

function Copyright({ link = 'https://mui.com/', company = 'Leftovers' }) {
	return (
		<Box display='flex' justifyContent={'center'} alignItems='center'>
			<Typography color='text.secondary' px={'10px'}>
				{'Copyright © '}
				{new Date().getFullYear()}
			</Typography>
			<span>
				<Link className={styles.link} color='inherit' href={link}>
					{company}
				</Link>
			</span>
		</Box>
	);
}

export default Copyright;
