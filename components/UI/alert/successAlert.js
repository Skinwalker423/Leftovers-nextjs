import React from 'react';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const SuccessAlert = ({ msg, setMsg, width = '100%' }) => {
	return (
		<Alert
			onClose={() => {
				setMsg('');
			}}
			color='success'
			variant='filled'
			sx={{
				position: 'fixed',
				bottom: 0,
				width: width,
				fontSize: 'larger',
				textAlign: 'center',
				justifyContent: 'center',
				zIndex: 50,
			}}>
			<Typography fontSize={'2rem'}>{msg}</Typography>
		</Alert>
	);
};

export default SuccessAlert;
