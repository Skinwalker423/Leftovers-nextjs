import React from 'react';
import { Box } from '@mui/material';
import PrepperCard from '../Card/prepperCard';
import Link from 'next/link';
import styles from './localPreppersList.module.css';

const LocalPreppersList = ({ localPreppers }) => {
	if (!localPreppers.length) {
		return;
	}
	const preppers = localPreppers.map(({ name, email, id, description }) => {
		const avatar = 'https://i.pravatar.cc/300';
		return (
			<PrepperCard
				title={name}
				subTitle={email}
				avatar={avatar}
				id={id}
				key={id}
				description={description}
			/>
		);
	});

	return (
		<Box
			className={styles.prepCardContainer}
			sx={{ overflowX: { xs: 'hidden' } }}
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			flexWrap={{ xs: 'none', md: 'wrap' }}>
			{localPreppers && localPreppers.length !== 0 && preppers}
		</Box>
	);
};

export default LocalPreppersList;
