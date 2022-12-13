import React from 'react';
import NavBar from '../../components/global/NavBar';
import { Box, Typography } from '@mui/material';
import PrepperCard from '../../components/Card';

const Home = () => {
	return (
		<Box
			height='100%'
			m='6rem 3rem'
			flexDirection={'column'}
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<NavBar />
			<Typography variant='h1'>List of all preppers in your area</Typography>
			<Box mt='20px' display='flex' gap='10px' flexWrap={'wrap'}>
				<PrepperCard />
				<PrepperCard />
				<PrepperCard />
				<PrepperCard />
				<PrepperCard />
				<PrepperCard />
			</Box>
		</Box>
	);
};

export default Home;
