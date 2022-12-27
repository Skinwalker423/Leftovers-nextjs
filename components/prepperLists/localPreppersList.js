import React from 'react';
import { Box } from '@mui/material';
import PrepperCard from '../Card';
import Link from 'next/link';
import styles from './localPreppersList.module.css';

const LocalPreppersList = ({ localPreppers }) => {
	if (!localPreppers) {
		return;
	}
	const preppers = localPreppers.map((prepper) => {
		const avatar = 'https://i.pravatar.cc/300';
		return (
			<Link
				className={styles.prepCard}
				key={prepper.id}
				href={`/preppers/${prepper.id}`}>
				<PrepperCard
					title={prepper.name}
					subTitle={prepper.email}
					avatar={avatar}
					id={prepper.id}
				/>
			</Link>
		);
	});

	return (
		<Box
			m={'300px 50px'}
			width={'100%'}
			display={'flex'}
			justifyContent='center'
			flexWrap='wrap'>
			{localPreppers && localPreppers.length !== 0 && preppers}
		</Box>
	);
};

export default LocalPreppersList;
