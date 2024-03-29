import React, { useState } from 'react';
import { updateProfileImageDb } from '../../../../utils/myKitchen/updateProfileImageDB';
import Image from 'next/image';
import {
	Modal,
	Box,
	Typography,
	Button,
	CircularProgress,
	Alert
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useColors } from '../../../../hooks/useColors';

const ProfileSavedImagesForm = ({
	email,
	setMsg,
	currentImg,
	savedImages,
	setProfileImage,
	selectedImg,
	setSelectedImg
}) => {
	const [open, setOpen] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(false);

	const [error, setError] = useState('');
	const { colors } = useColors();

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: { xs: '90%', sm: '75%', lg: '50%' },
		height: { xs: '70%', sm: '60%', lg: '50%' },
		bgcolor: 'background.paper',
		border: `2px solid ${colors.orangeAccent[900]}`,
		borderRadius: '1em',
		boxShadow: 24,
		p: 4
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const savedImagesList = savedImages?.map((image, i) => {
		return (
			<Box
				key={i}
				display={'flex'}
				position={'relative'}
				width={125}
				height={125}
				border={image === selectedImg && `5px solid ${colors.blueAccent[400]}`}
				onClick={() => setSelectedImg(image)}
			>
				<Image
					src={image}
					alt={'saved kitchen image'}
					fill
					style={{ objectFit: 'cover' }}
					sizes="125px"
				/>
				{image === selectedImg && (
					<CheckBoxIcon
						color="blue"
						sx={{
							position: 'absolute',
							top: 0,
							right: 0
						}}
					/>
				)}
			</Box>
		);
	});

	const handleImageUpdate = async (e) => {
		e.preventDefault();
		setIsFormLoading(true);

		try {
			const data = await updateProfileImageDb(email, selectedImg, 'update');
			if (data.message) {
				setProfileImage((prevImage) => {
					return selectedImg;
				});
				setMsg(data.message);
				setIsFormLoading(false);
				setOpen(false);
			}
		} catch (err) {
			console.error('problem updating image', err);
			setIsFormLoading(false);
			setError(err);
		} finally {
			setIsFormLoading(false);
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
				sx={{ py: 1, px: 3, width: '17em' }}
			>
				Choose from your saved images
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby={`update-profile-image-form`}
				aria-describedby={`update existing profile image form`}
			>
				<Box sx={style}>
					<form style={{ height: '100%' }} onSubmit={handleImageUpdate}>
						<Box
							height={'100%'}
							width={'100%'}
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'space-between'}
						>
							<Box
								display={'flex'}
								flexWrap={'wrap'}
								height={'80%'}
								width={'100%'}
								overflow={'auto'}
								gap={3}
							>
								{savedImagesList?.length > 0
									? savedImagesList
									: 'No saved Items'}
							</Box>
							<Button
								variant="contained"
								fullWidth
								disabled={isFormLoading || selectedImg === currentImg}
								color="success"
								type="submit"
								required
								size="large"
							>
								{isFormLoading ? (
									<CircularProgress />
								) : (
									<Typography fontSize={'larger'} lineHeight={'2.5em'}>
										Update Image
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
						</Box>
					</form>
				</Box>
			</Modal>
		</div>
	);
};

export default ProfileSavedImagesForm;
