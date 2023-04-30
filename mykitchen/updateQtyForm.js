import React, { useState, useRef } from 'react';
import {
	Modal,
	Box,
	Typography,
	Button,
	TextField,
	CircularProgress,
	Alert,
} from '@mui/material';

import { useColors } from '../../../../hooks/useColors';
import { updateMealQtyInDb } from '../../../../utils/meals';

const UpdateQtyForm = ({ email, setMsg, mealId }) => {
	const [open, setOpen] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [error, setError] = useState('');
	const { colors } = useColors();

	const qtyRef = useRef();

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '30rem',
		height: '20rem',
		bgcolor: 'background.paper',
		border: `2px solid ${colors.orangeAccent[900]}`,
		borderRadius: '1em',
		boxShadow: 24,
		p: 4,
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleAddMealForm = async (e) => {
		e.preventDefault();
		setIsFormLoading(true);
		//send image file to a img hosting server e.g. Cloudinary
		//put url to that image in mealDetails to send to mongodb

		try {
			const data = await updateMealQtyInDb(email, mealId, qtyRef.current.value);
			if (data.message) {
				setMsg(data.message);
				setIsFormLoading(false);
				setOpen(false);
			}
		} catch (err) {
			console.error('problem updating qty', err);
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
			<Button
				size='small'
				variant='outlined'
				color='success'
				onClick={handleOpen}>
				Update Qty
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='add-meal-form'
				aria-describedby='submit details to create a new meal'>
				<Box sx={style}>
					<form onSubmit={handleAddMealForm}>
						<Typography textAlign={'center'} variant='h3'>
							Number of meals you have on hand
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
							<Box width={'100%'}>
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
										Update
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

export default UpdateQtyForm;
