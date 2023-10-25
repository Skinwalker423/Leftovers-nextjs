import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import PrepperCard from '../../components/Card/prepperCard';
import { mockDataContacts } from '../../db/mockData';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

export default function CategoriesSlider({ list }) {
	return (
		<Box
			display={'flex'}
			width={'100%'}
			height={'100vh'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Box
				display={'flex'}
				height={'100%'}
				width={'100%'}
				px={{ xs: 5, sm: 8, md: 10 }}
				justifyContent={'center'}
				alignItems={'flex-start'}
				mt={10}
			>
				<Swiper
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
						enabled: true
					}}
					modules={[Keyboard, Scrollbar, Navigation, Pagination]}
					className="mySwiper"
				>
					{mockDataContacts.map(({ id, email, name, favorite }) => {
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
