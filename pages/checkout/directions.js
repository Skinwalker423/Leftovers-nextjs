import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

export default function Directions() {
	return (
		<Box
			display={'flex'}
			width={'100%'}
			height={'100vh'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Box height={'200px'} width={'80%'}>
				<Swiper
					slidesPerView={1}
					centeredSlides={false}
					slidesPerGroupSkip={4}
					grabCursor={true}
					keyboard={{
						enabled: true
					}}
					breakpoints={{
						769: {
							slidesPerView: 2,
							slidesPerGroup: 2
						}
					}}
					scrollbar={true}
					navigation={true}
					pagination={{
						clickable: true
					}}
					modules={[Keyboard, Scrollbar, Navigation, Pagination]}
					className="mySwiper"
				>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-002.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-004.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-005.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-006.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-007.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-008.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://cdn.magloft.com/github/swiper/images/page-009.jpg" />
					</SwiperSlide>
				</Swiper>
			</Box>
		</Box>
	);
}

// import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../../styles/Home.module.css';
// import { Box, Typography } from '@mui/material';
// import { useSession } from 'next-auth/react';
// import { useColors } from '../../hooks/useColors';
// import NavBar from '../../components/layout/navbar/NavBar';

// import useTrackLocation from '../../hooks/useTrackLocation';
// import { useEffect, useContext, useState, useRef } from 'react';
// import { ACTION_TYPES } from '../../store/UserContext';
// import { UserContext } from '../../store/UserContext';
// import CustomLoader from '../../components/UI/Loader';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from '!mapbox-gl';

// mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

// export default function Directions() {
// 	const mapContainer = useRef(null);
// 	const map = useRef(null);
// 	// const [lng, setLng] = useState(null);
// 	// const [lat, setLat] = useState(null);
// 	const [zoom, setZoom] = useState(9);
// 	const { data: session } = useSession();
// 	const { colors } = useColors();

// 	const { state, dispatch } = useContext(UserContext);
// 	const { lat, long } = state.coords;

// 	const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
// 		useTrackLocation();

// 	useEffect(() => {
// 		handleTrackLocation();
// 		// setLat(state.coords.lat);
// 		// setLng(state.coords.long);
// 		dispatch({
// 			type: ACTION_TYPES.SET_LATLONG,
// 			payload: {
// 				latlong: `${long},${lat}`,
// 				lat: lat,
// 				long: long
// 			}
// 		});
// 	}, []);

// 	useEffect(() => {
// 		if (!lat || !long) return;
// 		if (map.current) return; // initialize map only once
// 		map.current = new mapboxgl.Map({
// 			container: mapContainer.current,
// 			style: 'mapbox://styles/mapbox/streets-v12',
// 			center: [long, lat],
// 			zoom: zoom
// 		});
// 	});

// 	useEffect(() => {
// 		if (!map.current) return; // wait for map to initialize
// 		map.current.on('move', () => {
// 			dispatch({
// 				type: ACTION_TYPES.SET_LATLONG,
// 				payload: {
// 					latlong: `${long},${lat}`,
// 					lat: map.current.getCenter().lat.toFixed(4),
// 					long: map.current.getCenter().lng.toFixed(4)
// 				}
// 			});
// 			setZoom(map.current.getZoom().toFixed(2));
// 		});
// 	});

// 	return (
// 		<Box className={styles.container}>
// 			<Head>
// 				<title>Directions</title>
// 				<meta
// 					name="description"
// 					content="find directions to your local prepper"
// 				/>
// 			</Head>

// 			<main className={styles.main}>
// 				<NavBar />
// 				<Box>
// 					<Typography>{locationErrorMsg && locationErrorMsg}</Typography>
// 					<Typography>
// 						{state.coords.latlong !== null
// 							? state.coords.latlong
// 							: 'no coords available'}
// 					</Typography>
// 					{isFindingLocation && <CustomLoader />}
// 					<Box className={styles.mapc}>
// 						{/* <div className={styles.sidebar}>
// 						Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
// 					</div> */}
// 						<Box
// 							width={'800px'}
// 							height="400px"
// 							className={styles.mapContainer}
// 							ref={mapContainer}
// 						/>
// 					</Box>
// 				</Box>
// 			</main>

// 			<footer className={styles.footer}>
// 				<a
// 					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// 					target="_blank"
// 					rel="noopener noreferrer"
// 				>
// 					Powered by{' '}
// 					<span className={styles.logo}>
// 						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
// 					</span>
// 				</a>
// 			</footer>
// 		</Box>
// 	);
// }
