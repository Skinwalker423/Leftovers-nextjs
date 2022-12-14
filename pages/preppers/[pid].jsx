import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import NavBar from '../../components/global/NavBar';
import CustomLoader from '../../components/Loader';
import { mockDataContacts } from '../../data/mockData';

export async function getStaticProps({ params }) {
	const prepperId = params.pid;
	console.log(prepperId);
	// const videoList = await getVideoById(vidId);
	const findPrepper = mockDataContacts.find(
		(prepper) => prepperId == prepper.id
	);
	console.log(findPrepper);

	return {
		props: {
			prepper: findPrepper ? findPrepper : [],
		},

		revalidate: 60, // In seconds
	};
}

export async function getStaticPaths() {
	const listofBannerKitchens = ['1', '2', '3'];

	const paths = listofBannerKitchens.map((prepperId) => ({
		params: { pid: prepperId },
	}));

	return { paths, fallback: 'blocking' };
}

const Prepper = ({ prepper }) => {
	const router = useRouter();
	console.log(prepper);

	const prepperId = router.query.pid;
	if (!prepperId) {
		return <CustomLoader size={75} progress={50} color={'error'} />;
	}

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			width={'100%'}
			height='100%'>
			<NavBar />
			<Box
				m='100px 0'
				display='flex'
				justifyContent='center'
				alignItems='center'>
				<Typography variant='h1'>Prepper id: {prepperId}</Typography>
			</Box>
		</Box>
	);
};

export default Prepper;
