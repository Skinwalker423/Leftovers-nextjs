import React from 'react';
import { Box } from '@mui/material';
import PrepperCard from '../Card/prepperCard';
import Link from 'next/link';
import styles from './localPreppersList.module.css';

const LocalPreppersList = ({ localPreppers }) => {
	if (!localPreppers) {
		return;
	}
	const preppers = localPreppers.map((prepper) => {
		const avatar = 'https://i.pravatar.cc/300';
		return (
			<PrepperCard
				title={prepper.name}
				subTitle={prepper.email}
				avatar={avatar}
				id={prepper.id}
			/>
		);
	});

	return (
		<Box className={styles.prepCardContainer} display={'flex'} flexWrap='wrap'>
			{localPreppers && localPreppers.length !== 0 && preppers}
		</Box>
	);
};

export default LocalPreppersList;
