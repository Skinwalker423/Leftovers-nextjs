import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const InfoCard = ({ children, title = 'Title' }) => {
	return (
		<Paper
			sx={{
				mt: '2em',
				height: '100%',
				p: '2em',
			}}>
			<Box>
				<Typography color={'secondary'} variant='h4'>
					{title}
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				{children}
			</Box>
		</Paper>
	);
};

export default InfoCard;
