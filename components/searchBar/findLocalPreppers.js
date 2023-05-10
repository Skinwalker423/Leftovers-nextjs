import React from 'react';
import { Box, FormControl, IconButton, TextField } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useColors } from '../../hooks/useColors';
import styles from './findLocalPreppers.module.css';

const FindLocalPreppersSearchBar = ({
	handleZipSearchForm,
	handleZipChange,
	errorMsg
}) => {
	const { colors } = useColors();

	return (
		<Box position={'absolute'} top="50%" className={styles.searchContainer}>
			<form onSubmit={handleZipSearchForm}>
				<FormControl>
					<Box
						width={{ xs: '25em', sm: '40em' }}
						className={styles.searchBox}
						sx={{
							display: 'flex',
							backgroundColor: colors.primary[400],
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: '.5em',
							height: '5em',
							padding: '1.25em'
						}}
					>
						<AccountCircle
							className={styles.account}
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
						/>
						<IconButton type="submit" size="small">
							<ArrowForwardOutlinedIcon
								className={styles.arrow}
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
