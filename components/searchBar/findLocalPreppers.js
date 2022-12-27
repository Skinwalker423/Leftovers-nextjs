import React from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useColors } from '../../hooks/useColors';

const FindLocalPreppersSearchBar = ({
	handleZipSearchForm,
	handleZipChange,
	errorMsg,
}) => {
	const { colors } = useColors();

	return (
		<Box mt='100px'>
			<form onSubmit={handleZipSearchForm}>
				<FormControl>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'flex-end',
							backgroundColor: colors.blueAccent[900],
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: '5px',
							width: '600px',
							height: '70px',
							padding: '20px',
						}}>
						<AccountCircle
							sx={{
								color: 'action.active',
								mr: 3,
								my: 0.5,
							}}
						/>
						<TextField
							id='input-with-sx'
							label='Enter your current zip code'
							variant='standard'
							fullWidth
							color='warning'
							onChange={handleZipChange}
							helperText={errorMsg ? errorMsg : ''}
						/>
						<ArrowForwardOutlinedIcon
							sx={{ color: 'action.active', mr: 1, my: 0.5 }}
						/>
					</Box>
				</FormControl>
			</form>
		</Box>
	);
};

export default FindLocalPreppersSearchBar;
