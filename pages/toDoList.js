import React, { useState } from 'react';
import FormDialog from '../components/modal/ToDoList';
import {
	Box,
	MenuList,
	MenuItem,
	Typography,
	IconButton,
	Paper,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

const mockToDoList = [
	'buy grocieries',
	'pay bill',
	'doctor appointment',
	'gym',
];

const toDoList = () => {
	const [selected, setSelected] = useState(false);
	const [currentIndex, setCurrentIndex] = useState('');
	const [toDoList, setToDoList] = useState(mockToDoList);

	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			height='100vh'>
			<Typography variant='h1'>To Do List</Typography>
			<Box width='500px'>
				<Paper>
					<MenuList>
						{toDoList.map((event, index) => {
							const handleSelected = () => {
								setCurrentIndex(event);
								setSelected(true);
							};
							const handleRemoveToDo = () => {
								const newTodo = toDoList.filter(
									(event) => currentIndex !== event
								);
								setToDoList(newTodo);
								setCurrentIndex(null);
							};
							const handleEdit = () => {};
							return (
								<MenuItem
									key={'event' + index}
									selected={event === currentIndex}
									onClick={handleSelected}
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										height: '50px',
									}}>
									<Typography>{event}</Typography>
									{event === currentIndex && (
										<Box>
											<IconButton onClick={handleEdit}>
												<EditIcon />
											</IconButton>
											<IconButton onClick={handleRemoveToDo}>
												<DeleteOutlineIcon />
											</IconButton>
										</Box>
									)}
								</MenuItem>
							);
						})}
					</MenuList>
				</Paper>
			</Box>
			<Box>
				<FormDialog setToDoList={setToDoList} />
			</Box>
		</Box>
	);
};

export default toDoList;
