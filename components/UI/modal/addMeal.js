import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useColors } from '../../../hooks/useColors';

const AddMeal = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { colors } = useColors();

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		height: '50%',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	return (
		<div>
			<Button
				sx={{
					backgroundColor: colors.orangeAccent[900],
					'&:hover': {
						backgroundColor: colors.orangeAccent[700],
					},
				}}
				onClick={handleOpen}>
				Add Meal
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Add a meal to your kitchen
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default AddMeal;
