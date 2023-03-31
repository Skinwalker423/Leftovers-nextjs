import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Confirmation = () => {
	return (
		<Box>
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
