import React, { useState, useRef } from 'react';
import {
	Modal,
	Box,
	Typography,
	Button,
	TextField,
	CircularProgress,
} from '@mui/material';
import { useColors } from '../../../../hooks/useColors';

const AddMeal = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const { colors } = useColors();

	const titleRef = useRef();
	const descriptionRef = useRef();
	const priceRef = useRef();

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		height: '50%',
		bgcolor: 'background.paper',
		border: `2px solid ${colors.orangeAccent[900]}`,
		borderRadius: '1em',
		boxShadow: 24,
		p: 4,
	};

	const handleFileChange = (e) => {
		console.log(e.target.files[0]);
		setImageFile(e.target.files[0]);
	};

	const handleAddMealForm = (e) => {
		e.preventDefault();
		const mealDetails = {
			title: titleRef.current.value,
			price: priceRef.current.value,
			description: descriptionRef.current.value,
			image: imageFile,
		};

		console.log(mealDetails);
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
				aria-labelledby='modal-title'
				aria-describedby='modal-description'>
				<Box sx={style}>
					<form onSubmit={handleAddMealForm}>
						<Typography textAlign={'center'} variant='h3'>
							Add a meal to your kitchen
						</Typography>
						<Box
							display={'flex'}
							flexDirection='column'
							alignItems='space-between'
							justifyContent={'space-between'}
							gap='2em'
							px='5em'
							width='100%'
							mt='1em'>
							<Box>
								<TextField
									id='title'
									type='text'
									label='Meal Name'
									required
									placeholder="Dreamer's Donuts"
									color='secondary'
									fullWidth
									inputRef={titleRef}
								/>
							</Box>
							<Box>
								<TextField
									id='price'
									type='number'
									label='Price'
									required
									placeholder='$4.99'
									color='secondary'
									fullWidth
									inputRef={priceRef}
								/>
							</Box>
							<Button variant='contained' color='secondary' component='label'>
								Upload Pic of Meal
								<input onChange={handleFileChange} type='file' hidden />
							</Button>
							<Box>
								<TextField
									minRows={3}
									multiline
									maxRows={3}
									required
									color='secondary'
									label='Description of this meal'
									placeholder='Enter a brief description of what is included in this meal'
									fullWidth
									inputRef={descriptionRef}
								/>
							</Box>
							<Button
								variant='contained'
								fullWidth
								disabled={isFormLoading}
								color='success'
								type='submit'
								required
								size='large'>
								{isFormLoading ? (
									<CircularProgress />
								) : (
									<Typography fontSize={'larger'} lineHeight={'2.5em'}>
										Submit
									</Typography>
								)}
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</div>
	);
};

export default AddMeal;
