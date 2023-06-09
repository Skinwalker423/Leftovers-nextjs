import React from 'react';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const ErrorAlert = ({ error, setError, width = '100%' }) => {
	return (
		<Alert
			onClose={() => {
				setError('');
			}}
			color="error"
			severity="error"
			variant="filled"
			sx={{
				position: 'fixed',
				bottom: 0,
				width: width,
				fontSize: 'larger',
				textAlign: 'center',
				justifyContent: 'center',
				zIndex: 150
			}}
		>
			<Typography fontSize={'2rem'}>{error}</Typography>
		</Alert>
	);
};

export default ErrorAlert;
