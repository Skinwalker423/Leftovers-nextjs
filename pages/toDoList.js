import ToDoList from '../components/toDoList';
import NavBar from '../components/navbar/NavBar';
import { Box } from '@mui/material';
import Head from 'next/head';

const toDoList = () => {
	return (
		<Box width='100%' height='100vh'>
			<Head>
				<title>To Do Widget</title>
				<meta name='description' content='Create a to-do list' />
			</Head>
			<main>
				<NavBar />
				<ToDoList />
			</main>
		</Box>
	);
};

export default toDoList;
