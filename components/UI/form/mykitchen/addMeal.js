import React, { useState, useRef } from 'react';
import {
	Modal,
	Box,
	Typography,
	Button,
	TextField,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	CircularProgress,
	Alert,
} from '@mui/material';

import { useColors } from '../../../../hooks/useColors';
import { addMeal } from '../../../../utils/meals';

const AddMeal = ({ email, setMsg, setMeals }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [error, setError] = useState('');
	const [cost, setCost] = useState(0);
	const { colors } = useColors();

	const titleRef = useRef();
	const descriptionRef = useRef();
	const qtyRef = useRef();

	const costArray = [0, 5, 10, 15, 20];

	const costList = costArray.map((cost) => {
		return (
			<MenuItem key={cost} value={cost}>
				$ {cost}
			</MenuItem>
		);
	});

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		height: '55%',
		bgcolor: 'background.paper',
		border: `2px solid ${colors.orangeAccent[900]}`,
		borderRadius: '1em',
		boxShadow: 24,
		p: 4,
	};

	const handlePriceChange = (e) => {
		setCost(e.target.value);
	};

	const handleFileChange = (e) => {
		console.log(e.target.files[0]);
		setImageFile(e.target.files[0]);
	};

	const handleAddMealForm = async (e) => {
		e.preventDefault();
		setIsFormLoading(true);
		//send image file to a img hosting server e.g. Cloudinary
		//put url to that image in mealDetails to send to mongodb

		const mealDetails = {
			title: titleRef.current.value,
			price: parseInt(cost),
			description: descriptionRef.current.value,
			image: '',
			qty: parseInt(qtyRef.current.value),
		};

		console.log(mealDetails);
		try {
			const data = await addMeal(email, mealDetails);
			if (data.message) {
				setMeals((meals) => {
					return [...meals, data.meal];
				});
				setMsg(data.message);
				setIsFormLoading(false);
				setOpen(false);
			}
		} catch (err) {
			console.error('problem adding meal', err);
			setIsFormLoading(false);
			setError(err);
		}

		setTimeout(() => {
			setMsg('');
			setError('');
		}, 3000);
	};

	return (
		<div>
			<Button variant='outlined' color='success' onClick={handleOpen}>
				Add Meal
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='add-meal-form'
				aria-describedby='submit details to create a new meal'>
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
							<Box display={'flex'} justifyContent='space-between'>
								<Box width={'45%'}>
									<TextField
										id='qty'
										type='number'
										label='Number of meals on hand'
										required
										placeholder='5'
										color='secondary'
										fullWidth
										inputRef={qtyRef}
									/>
								</Box>
								<Box width={'45%'}>
									<FormControl fullWidth>
										<InputLabel id='price'>Price</InputLabel>
										<Select
											labelId='price'
											id='price'
											label='Price'
											value={cost}
											required
											defaultValue={5}
											onChange={handlePriceChange}>
											{costList}
										</Select>
									</FormControl>
								</Box>
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
							{error && (
								<Alert
									onClose={() => {
										setError('');
									}}
									position='relative'
									sx={{
										width: '100%',
										fontSize: 'larger',
									}}
									severity='error'>
									{error}
								</Alert>
							)}
						</Box>
					</form>
				</Box>
			</Modal>
		</div>
	);
};

export default AddMeal;
