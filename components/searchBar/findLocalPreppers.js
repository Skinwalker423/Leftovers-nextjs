import React from 'react';
import { Box, FormControl, IconButton, TextField } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useColors } from '../../hooks/useColors';

const FindLocalPreppersSearchBar = ({
	handleZipSearchForm,
	handleZipChange,
	errorMsg
}) => {
	const { colors } = useColors();

	return (
		<Box position={'relative'} top={100}>
			<form onSubmit={handleZipSearchForm}>
				<FormControl>
					<Box
						display={'flex'}
						backgroundColor={colors.primary[400]}
						width={{ xs: '25em', sm: '40em' }}
						py="2.5rem"
						px="1.25rem"
						justifyContent={'center'}
						alignItems={'center'}
						height={'5rem'}
						borderRadius={'.5rem'}
					>
						<AccountCircle
							color="secondary"
							sx={{
								mr: 2,
								my: 0.5,
								fontSize: 'large',
								height: '3em',
								width: '2em'
							}}
						/>
						<TextField
							sx={{ mr: '1rem' }}
							id="input-with-sx"
							label="Enter your current zip code"
							variant="standard"
							fullWidth
							color="warning"
							onChange={handleZipChange}
							helperText={errorMsg ? errorMsg : ''}
							error={errorMsg}
						/>
						<IconButton type="submit" size="small">
							<ArrowForwardOutlinedIcon
								color="secondary"
								sx={{
									my: 0.5,
									fontSize: 'large',
									height: '2em',
									width: '2em'
								}}
							/>
						</IconButton>
					</Box>
				</FormControl>
			</form>
		</Box>
	);
};

export default FindLocalPreppersSearchBar;
