import ToDoList from '../components/toDoList';
import NavBar from '../components/global/NavBar';
import { Box } from '@mui/material';

const toDoList = () => {
	return (
		<Box width='100%' height='100vh'>
			<NavBar />
			<ToDoList />
		</Box>
	);
};

export default toDoList;
