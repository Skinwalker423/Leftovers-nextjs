import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useColors } from '../../hooks/useColors';
import { useCustomPagination } from '../../hooks/useCustomPagination';
import { useEffect } from 'react';

const CategoryPaginationHeader = ({
	title = 'Title Here',
	color,
	list,
	resultsPerPage = 3,
	setSlicedList,
	userEmail,
	meals
}) => {
	if (!list) return;

	const {
		pag,
		disableNext,
		disablePrev,
		setNewPagNext,
		setNewPagPrev,
		length
	} = useCustomPagination({ list, resultsPerPage });

	useEffect(() => {
		const slicedList = list.slice(pag.start, pag.end);

		setSlicedList(slicedList);
	}, [pag]);

	const { colors } = useColors();

	const handleNextPagination = () => {
		setNewPagNext();
	};
	const handlePrevPagination = () => {
		setNewPagPrev();
	};

	return (
		<Box
			display={'flex'}
			justifyContent={'space-around'}
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
						disabled={disablePrev}
						onClick={handlePrevPagination}
						size="large"
					>
						<ArrowBackIosIcon fontSize="large" />
					</IconButton>
					<IconButton
						disabled={disableNext}
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
