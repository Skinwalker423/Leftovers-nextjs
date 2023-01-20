import React, { useRef, useState } from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ setToDoList }) {
	const [open, setOpen] = useState(false);
	const [toDo, setToDo] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
		setToDo('');
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleAddToDo = () => {
		console.log(toDo);
		setToDoList((list) => [...list, toDo]);

		// setToDoList();
		setOpen(false);
	};

	const handleChange = (e) => {
		setToDo(e.target.value);
	};

	return (
		<Box>
			<Button variant='contained' color='success' onClick={handleClickOpen}>
				Add a ToDo
			</Button>
			<Dialog
				maxWidth={'md'}
				fullWidth={true}
				open={open}
				onClose={handleClose}>
				<DialogTitle>ToDo</DialogTitle>
				<DialogContent>
					<DialogContentText>Add an event to your to do list</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='toDo'
						label='eg: Go to the gym'
						type='text'
						fullWidth
						variant='standard'
						value={toDo}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' color='error' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='contained' color='success' onClick={handleAddToDo}>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
