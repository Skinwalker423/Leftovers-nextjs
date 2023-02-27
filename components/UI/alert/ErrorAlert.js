import React from 'react';
import { Alert } from '@mui/material';

const ErrorAlert = ({ error, setError }) => {
	return (
		<Alert
			onClose={() => {
				setError('');
			}}
			sx={{
				width: '50%',
				fontSize: 'larger',
				position: 'absolute',
				top: '10em',
				left: '35em',
			}}
			severity='error'>
			{error}
		</Alert>
	);
};

export default ErrorAlert;
