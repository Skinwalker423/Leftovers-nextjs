import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress } from '@mui/material';
import NavBar from '../../components/global/NavBar';
import CustomLoader from '../../components/Loader';

const Prepper = () => {
	const router = useRouter();

	const prepperId = router.query.pid;
	if (!prepperId) {
		return <CustomLoader size={75} progress={50} color={'error'} />;
	}

	return (
		<Box
			m='20px'
			display='flex'
			justifyContent='center'
			alignItems='center'
			width={'100%'}
			height='100%'>
			<NavBar />
			<Typography variant='h1'>Prepper id: {prepperId}</Typography>
		</Box>
	);
};

export default Prepper;
