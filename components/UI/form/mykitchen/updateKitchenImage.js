import React, { useState } from 'react';
import { updateKitchenImageDb } from '../../../../utils/myKitchen/updateKitchenImage';
import {
	Modal,
	Box,
	Typography,
	Button,
	CircularProgress,
	Alert
} from '@mui/material';

import { useColors } from '../../../../hooks/useColors';

const UpdateKitchenImage = ({ email, setMsg, currentImg, savedImages }) => {
	const [open, setOpen] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [selectedImg, setSelectedImg] = useState(currentImg);
	const [error, setError] = useState('');
	const { colors } = useColors();

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
		p: 4
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleImageUpdate = async (e) => {
		e.preventDefault();
		setIsFormLoading(true);

		try {
			const data = await updateKitchenImageDb(email, selectedImg, 'update');
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
				size="small"
				variant="outlined"
				color="warning"
				onClick={handleOpen}
			>
				Update {oldKitchenTitle ? 'Title' : 'Description'}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby={`update-${
					oldKitchenTitle ? 'title' : 'description'
				}-form`}
				aria-describedby={`update existing kitchen ${
					oldKitchenTitle ? 'title' : 'description'
				}-form`}
			>
				<Box sx={style}>
					<form onSubmit={handleImageUpdate}>
						<Button
							variant="contained"
							fullWidth
							disabled={isFormLoading}
							color="success"
							type="submit"
							required
							size="large"
						>
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
								position="relative"
								sx={{
									width: '100%',
									fontSize: 'larger'
								}}
								severity="error"
							>
								{error}
							</Alert>
						)}
					</form>
				</Box>
			</Modal>
		</div>
	);
};

export default UpdateKitchenImage;
