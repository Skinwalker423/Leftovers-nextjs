import React, { useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PrepperCard from '../../Card/prepperCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useUserContext } from '../../../hooks/useUserContext';
import { useColors } from '../../../hooks/useColors';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

export default function CategoriesSlider({
	list,
	setMsg,
	setErrorMsg,
	userEmail,
	title = 'Title Here',
	themeColor,
	link = '/'
}) {
	const { state } = useUserContext();
	const swiperRef = useRef();
	const { colors } = useColors();

	const handleNext = () => {
		swiperRef.current?.slideNext();
	};
	const handlePrev = () => {
		swiperRef.current?.slidePrev();
	};

	const favoritesPrepId = state.favorites.map(({ id }) => id);

	if (!list.length) return;

	return (
		<Box
			display={'flex'}
			width={'100%'}
			height={'100%'}
			alignItems={'center'}
			justifyContent={'center'}
			flexDirection={'column'}
		>
			<Box
				pb={3}
				px={{ xs: 6, lg: 20 }}
				width={'100%'}
				display={'flex'}
				justifyContent={'space-around'}
				alignItems={'center'}
				flexDirection={{ xs: 'column', sm: 'row' }}
				gap={{ xs: 2, sm: 0 }}
			>
				<Typography
					sx={{ color: themeColor || colors.primary[100] }}
					variant="h2"
				>
					{title}
				</Typography>
				<Box display={'flex'} gap={2} alignItems={'center'}>
					<Link
						style={{ textDecoration: 'none', paddingRight: '1rem' }}
						href={link}
					>
						<Typography
							sx={{ color: themeColor || colors.primary[100] }}
							variant="h3"
						>
							See All
						</Typography>
					</Link>
					<IconButton
						onClick={handlePrev}
						size="large"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<ArrowBackIosIcon fontSize="large" />
					</IconButton>
					<IconButton
						onClick={handleNext}
						size="large"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<ArrowForwardIosIcon fontSize="large" />
					</IconButton>
				</Box>
			</Box>
			<Box
				display={'flex'}
				height={'100%'}
				width={'100%'}
				justifyContent={'center'}
				alignItems={'center'}
				px={{ xs: 5, sm: 8, md: 10 }}
				maxWidth={'100%'}
				maxHeight={'100%'}
				minHeight={0}
				minWidth={0}
			>
				<Swiper
					style={{ width: list.length < 3 ? '50%' : '100%' }}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper;
					}}
					slidesPerView={1}
					centeredSlides={false}
					slidesPerGroupSkip={0}
					grabCursor={true}
					keyboard={{
						enabled: true
					}}
					breakpoints={{
						769: {
							slidesPerView: list.length < 2 ? list.length : 2,
							slidesPerGroup: list.length < 2 ? list.length : 2
						},

						1201: {
							slidesPerView: list.length < 3 ? list.length : 3,
							slidesPerGroup: list.length < 3 ? list.length : 3
						},
						1621: {
							slidesPerView: list.length < 4 ? list.length : 4,
							slidesPerGroup: list.length < 4 ? list.length : 4
						}
					}}
					scrollbar={false}
					navigation={false}
					modules={[Keyboard, Scrollbar, Navigation, Pagination]}
					className="mySwiper"
				>
					{list.map(
						({
							id,
							description,
							kitchenTitle,
							email,
							kitchenImgUrl,
							profileImgUrl,
							mealsServed
						}) => {
							const favorited =
								state.favorites && favoritesPrepId.includes(id) ? true : false;
							return (
								<SwiperSlide key={id}>
									<PrepperCard
										isFavorited={favorited}
										name={kitchenTitle}
										avatar={profileImgUrl}
										id={id}
										key={id}
										description={description}
										userEmail={userEmail}
										setMsg={setMsg}
										setErrorMsg={setErrorMsg}
										kitchenImgUrl={kitchenImgUrl}
										mealsServed={mealsServed}
										email={email}
									/>
								</SwiperSlide>
							);
						}
					)}
				</Swiper>
			</Box>
		</Box>
	);
}
