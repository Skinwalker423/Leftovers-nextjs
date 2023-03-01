import React from 'react';
import { Paper, Typography } from '@mui/material';

const InfoCard = ({ children }) => {
	return (
		<Paper
			sx={{
				mt: '2em',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: '100%',
				p: '2em',
			}}>
			{children}
		</Paper>
	);
};

export default InfoCard;
