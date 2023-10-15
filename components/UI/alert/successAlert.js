import React from 'react';
import Alert from '@mui/material/Alert';

const SuccessAlert = ({ msg, setMsg, width = '30rem' }) => {
	return (
		<Alert
			onClose={() => {
				setMsg('');
			}}
			color="success"
			severity="success"
			variant="filled"
			sx={{
				position: 'fixed',
				bottom: { xs: 0, sm: 10 },
				left: { xs: 0, sm: 10 },
				width: { xs: '100%', sm: width },
				fontSize: { xs: 'medium', md: 'larger' },
				textAlign: 'center',
				justifyContent: 'center',
				zIndex: 99
			}}
		>
			{msg}
		</Alert>
	);
};

export default SuccessAlert;
