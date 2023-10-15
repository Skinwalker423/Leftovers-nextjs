import React from 'react';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const SuccessAlert = ({ msg, setMsg, width = '20rem' }) => {
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
				width: { xs: '100%', sm: '30rem' },
				fontSize: { xs: 'medium', md: 'larger' },
				textAlign: 'center',
				justifyContent: 'center',
				zIndex: 99
			}}
		>
			{msg}
			{/* <Typography fontSize={'2rem'}>{msg}</Typography> */}
		</Alert>
	);
};

export default SuccessAlert;
