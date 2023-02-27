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
				position: 'absolute',
				bottom: '21em',
				left: '35em',
			}}
			severity='success'>
			{msg}
		</Alert>
	);
};

export default SuccessAlert;
