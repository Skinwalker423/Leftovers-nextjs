import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress } from '@mui/material';
import NavBar from '../../components/global/NavBar';

const Prepper = () => {
	const router = useRouter();

	const prepperId = router.query.pid;
	if (!prepperId) {
		return (
			<Box
				height='100vh'
				width='100%'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<CircularProgress color='success' />
				<Typography sx={{ mt: '20px' }}>Loading...</Typography>
			</Box>
		);
	}
	console.log(prepperId);

	return (
		<Box
			m='20px'
			display='flex'
			justifyContent='center'
			alignItems='center'
			width={'100%'}
			height='100vh'>
			<NavBar />
			<Typography variant='h1'>Prepper id: {prepperId}</Typography>
		</Box>
	);
};

export default Prepper;
