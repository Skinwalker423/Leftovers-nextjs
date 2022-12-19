import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import NavBar from '../../components/global/NavBar';
import CustomLoader from '../../components/Loader';
import { fetchPrepper } from '../../utils/fetchPrepper';

export async function getStaticProps({ params }) {
	const prepperId = params.pid;

	const prepperData = await fetchPrepper(prepperId);
	console.log({ prepperData });

	return {
		props: {
			prepper: prepperData ? prepperData : [],
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
		return (
			<Box
				width='100%'
				height='100vh'
				display='flex'
				justifyContent='center'
				alignItems='center'>
				<CustomLoader
					size={75}
					progress={50}
					color={'error'}
					title='Loading...'
				/>
				;
			</Box>
		);
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
				flexDirection={'column'}
				justifyContent='center'
				alignItems='center'>
				<Typography variant='h1'>Prepper id: {prepperId}</Typography>
				<Typography variant='h1'> name: {prepper.name}</Typography>
				<Typography variant='h1'> email: {prepper.email}</Typography>
				<Typography variant='h1'> address: {prepper.address}</Typography>
				<Typography variant='h1'> city: {prepper.city}</Typography>
				<Typography variant='h1'> state: {prepper.state}</Typography>
				<Typography variant='h1'> phone: {prepper.phone}</Typography>
			</Box>
		</Box>
	);
};

export default Prepper;
