import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PrepperCard from '../../Card/prepperCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
	title = 'Title Here'
}) {
	const swiperRef = useRef();
	const handleNext = () => {
		swiperRef.current?.slideNext();
	};
	const handlePrev = () => {
		swiperRef.current?.slidePrev();
	};

	return (
		<Box
			display={'flex'}
			width={'100%'}
			height={'100%'}
			justifyContent={'space-evenly'}
			alignItems={'center'}
			flexDirection={'column'}
		>
			<Box
				pb={3}
				px={{ xs: 6, lg: 20 }}
				width={'100%'}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				flexDirection={{ xs: 'column', sm: 'row' }}
				gap={{ xs: 2, sm: 0 }}
			>
				<Typography variant="h2">{title}</Typography>
				<Box display={'flex'} gap={2} alignItems={'center'}>
					<Link
						style={{ textDecoration: 'none', paddingRight: '1rem' }}
						href={'/'}
					>
						<Typography variant="h3">See All</Typography>
					</Link>
					<ArrowBackIosIcon onClick={handlePrev} />
					<ArrowForwardIosIcon onClick={handleNext} />
				</Box>
			</Box>
			<Box
				display={'flex'}
				height={'100%'}
				width={'100%'}
				justifyContent={'center'}
				alignItems={'flex-start'}
				px={{ xs: 5, sm: 8, md: 10 }}
			>
				<Swiper
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
							slidesPerView: 2,
							slidesPerGroup: 2
						},

						1201: {
							slidesPerView: 3,
							slidesPerGroup: 3
						},
						1621: {
							slidesPerView: 4,
							slidesPerGroup: 4
						}
					}}
					scrollbar={false}
					navigation={{
						enabled: false
					}}
					modules={[Keyboard, Scrollbar, Navigation, Pagination]}
					className="mySwiper"
				>
					{list.map(({ id, email, name, favorite }) => {
						return (
							<SwiperSlide key={id} title="Test 1">
								<PrepperCard isFavorited={favorite} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</Box>
		</Box>
	);
}
