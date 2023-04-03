import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Confirmation = () => {
	return (
		<Box
			width={'100%'}
			height={'100vh'}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}>
			<Typography variant='h1'>Thanks for your order!</Typography>
			<Box>
				<Typography variant='h3'>
					Here are the directions to for your local prepper to pick up your meal
				</Typography>
				<Typography variant='h5'>address here</Typography>
			</Box>
		</Box>
	);
};

export default Confirmation;
