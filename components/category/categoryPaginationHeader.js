import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useColors } from '../../hooks/useColors';

const CategoryPaginationHeader = ({
	title = 'Title Here',
	color,
	pag,
	setPag,
	length
}) => {
	const { colors } = useColors();

	const handleNextPagination = () => {
		setPag();
	};
	const handlePrevPagination = () => {};

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			px={10}
		>
			<Typography
				sx={{ color: color ? color : colors.orangeAccent[400] }}
				variant="h1"
			>
				{title}
			</Typography>
			<Box
				display={'flex'}
				justifyContent={'flex-end'}
				alignItems={'center'}
				gap={5}
			>
				<Typography variant="h3">See All</Typography>
				<Box display={'flex'}>
					<IconButton
						disabled={true}
						onClick={handlePrevPagination}
						size="large"
					>
						<ArrowBackIosIcon fontSize="large" />
					</IconButton>
					<IconButton
						disabled={true}
						onClick={handleNextPagination}
						size="large"
					>
						<ArrowForwardIosIcon fontSize="large" />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

export default CategoryPaginationHeader;
