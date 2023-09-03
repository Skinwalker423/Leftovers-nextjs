import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const InfoCard = ({ children, title = 'Title' }) => {
	return (
		<Paper
			sx={{
				my: '2rem ',
				ml: { xs: 0, sm: '2rem' },
				height: '100%',
				width: { xs: '100%', md: '80%', lg: '70%' },
				p: 2
			}}
		>
			<Box>
				<Typography color={'secondary'} variant="h4">
					{title}
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				{children}
			</Box>
		</Paper>
	);
};

export default InfoCard;
