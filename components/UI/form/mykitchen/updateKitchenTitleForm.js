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
import { updateKitchenTitleDb } from '../../../../utils/myKitchen/updateKitchenTitle';

const UpdateKitchenTitleForm = ({ email, setMsg, oldKitchenTitle }) => {
	const [open, setOpen] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [error, setError] = useState('');
	const { colors } = useColors();

	const titleRef = useRef();

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

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		setIsFormLoading(true);

		try {
			const data = await updateKitchenTitleDb(email, titleRef.current.value);
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
	};

	return (
		<div>
			<Button
				size='small'
				variant='contained'
				color='success'
				onClick={handleOpen}>
				Update Kicthen Title
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='update-title-form'
				aria-describedby='Update the existing kicthen title'>
				<Box sx={style}>
					<form onSubmit={handleSubmitForm}>
						<Typography textAlign={'center'} variant='h3'>
							New Kicthen Title
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
									id='kitchenTitle'
									type='text'
									label='Kicthen Title'
									required
									placeholder={oldKitchenTitle}
									color='secondary'
									fullWidth
									inputRef={titleRef}
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

export default UpdateKitchenTitleForm;
