import React from 'react';

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
				top: '10em',
				left: '35em',
			}}
			severity='success'>
			{msg}
		</Alert>
	);
};

export default SuccessAlert;
