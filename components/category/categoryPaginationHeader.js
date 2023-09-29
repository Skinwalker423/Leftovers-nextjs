import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CategoryPaginationHeader = () => {
	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			px={7}
		>
			<Typography color={'secondary'} variant="h2">
				Local Preppers
			</Typography>
			<Box
				display={'flex'}
				justifyContent={'flex-end'}
				alignItems={'center'}
				gap={5}
			>
				<Typography variant="h3">See All</Typography>
				<Box display={'flex'}>
					<IconButton size="large">
						<ArrowBackIosIcon fontSize="large" />
					</IconButton>
					<IconButton size="large">
						<ArrowForwardIosIcon fontSize="large" />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

export default CategoryPaginationHeader;
