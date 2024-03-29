import React, { useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	Button,
	TextField,
	CircularProgress,
	Alert,
	Tooltip
} from '@mui/material';

import { useColors } from '../../../../hooks/useColors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useUserContext } from '../../../../hooks/useUserContext';
import { isValidZipCode } from '../../../../utils/form-validation';
import { useSession } from 'next-auth/react';
import { fetchUpdateUserZipcode } from '../../../../utils/users';
import { useRouter } from 'next/router';

const UpdateDefaultZipcodeForm = () => {
	const [open, setOpen] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [error, setError] = useState('');
	const { colors } = useColors();
	const [zipcode, setZipcode] = useState('');
	const [msg, setMsg] = useState('');

	const router = useRouter();

	const { setDefaultZipcode, state } = useUserContext();
	const { data: session } = useSession();

	const sessionUserId = session?.user?.id;
	const sessionUserZipcode = session?.user?.defaultZipcode;

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

	const handleZipcodeChange = (e) => {
		setZipcode(e.target.value);
	};

	const handleUpdateZipcodeForm = async (e) => {
		e.preventDefault();
		setIsFormLoading(true);
		const isValidZip = isValidZipCode(zipcode);

		if (!isValidZip) {
			setError('Invalid zipcode');
			setIsFormLoading(false);
			return;
		}

		try {
			const response = await fetchUpdateUserZipcode(sessionUserId, zipcode);

			if (response.message) {
				setDefaultZipcode(zipcode);
				setMsg(response.message);
				handleClose();
				setIsFormLoading(false);
				router.reload();
			} else {
				setIsFormLoading(false);
				setError('problem with the request');
			}
		} catch (err) {
			console.error('problem updating zipcode', err);
			setIsFormLoading(false);
			setError(err);
		}

		setTimeout(() => {
			setMsg('');
		}, 3000);
	};

	return (
		<div>
			<Tooltip title="set default zipcode">
				<Box
					onClick={handleOpen}
					sx={{
						border: `1px solid ${colors.orangeAccent[400]}`,
						borderRadius: 3,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 0.5,
						px: { xs: 1, sm: 2 },
						py: 0.5,
						cursor: 'pointer',
						':hover': {
							bgcolor: colors.orangeAccent[700]
						}
					}}
					size={'small'}
				>
					<LocationOnIcon color="error" />
					<Typography sx={{ color: colors.orangeAccent[100] }}>
						{state.defaultZipcode || sessionUserZipcode || 'Zipcode'}
					</Typography>
				</Box>
			</Tooltip>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="add-meal-form"
				aria-describedby="submit details to create a new meal"
			>
				<Box sx={style}>
					<form onSubmit={handleUpdateZipcodeForm}>
						<Typography textAlign={'center'} variant="h3">
							Set your preferred zipcode
						</Typography>
						<Box
							display={'flex'}
							flexDirection="column"
							alignItems="space-between"
							justifyContent={'space-between'}
							gap="2em"
							px="5em"
							width="100%"
							mt="1em"
						>
							<Box width={'100%'}>
								<TextField
									id="zipcode"
									type="text"
									label="zipcode"
									required
									placeholder="90210"
									color="secondary"
									fullWidth
									onChange={handleZipcodeChange}
									value={zipcode}
								/>
							</Box>

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
						</Box>
					</form>
				</Box>
			</Modal>
			{msg && (
				<Alert
					onClose={() => {
						setMsg('');
					}}
					color="success"
					severity="success"
					variant="filled"
					sx={{
						position: 'absolute',
						top: 100,
						right: 50,
						width: '23rem',
						fontSize: 'larger',
						textAlign: 'center',
						justifyContent: 'center',
						zIndex: 99
					}}
				>
					<Typography fontSize={'2rem'}>{msg}</Typography>
				</Alert>
			)}
		</div>
	);
};

export default UpdateDefaultZipcodeForm;
