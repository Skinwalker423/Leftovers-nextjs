import React from 'react';
import { Alert } from '@mui/material';

const SuccessAlert = ({ msg, setMsg }) => {
	return (
		<Alert
			onClose={() => {
				setMsg('');
			}}
			sx={{
				width: '50%',
				fontSize: 'larger',
				position: 'relative',
				top: 0,
				left: '35em',
				zIndex: 99,
			}}
			severity='success'>
			{msg}
		</Alert>
	);
};

export default SuccessAlert;
