import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

export default function AreYouSure({
	title = 'Remove',
	text = 'Are you Sure?',
	onConfirmationClick,
	buttonColor = 'error',
	buttonTitle = 'Open Model'
}) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleConfirmationBtn = async () => {
		try {
			await onConfirmationClick();
			handleClose();
		} catch (err) {
			console.error(err);
			handleClose();
		}
	};

	return (
		<div>
			<Button
				variant="outlined"
				size="small"
				color={buttonColor}
				onClick={handleOpen}
			>
				{buttonTitle}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="areYouSure"
				aria-describedby="confirmation-dialogue"
			>
				<Box sx={style}>
					<Typography id="areYouSure" variant="h6" component="h2">
						{title}
					</Typography>
					<Typography id="confirmation-dialogue" sx={{ mt: 2 }}>
						{text}
					</Typography>
					<Box mt={'2em'} display={'flex'} justifyContent={'center'}>
						<Button
							onClick={handleConfirmationBtn}
							variant="outlined"
							color="success"
						>
							Yes, Continue
						</Button>
						<Button onClick={handleClose} variant="outlined" color="error">
							No, Cancel
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
