import React from 'react';
import Alert from '@mui/material/Alert';

const ErrorAlert = ({ error, setError, width = '30rem' }) => {
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
				bottom: { xs: 0, sm: 10 },
				right: { xs: 0, sm: 10 },
				width: { xs: '100%', sm: width },
				fontSize: { xs: 'medium', md: 'x-large' },
				textAlign: 'center',
				justifyContent: 'center',
				zIndex: 150
			}}
		>
			{error}
		</Alert>
	);
};

export default ErrorAlert;
