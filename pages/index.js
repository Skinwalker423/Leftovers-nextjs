import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useColors } from '../hooks/useColors';
import NavBar from '../components/global/NavBar';
import { mockDataContacts } from '../data/mockData';
import useTrackLocation from '../hooks/useTrackLocation';
import { useEffect, useContext, useState, useRef } from 'react';
import { ACTION_TYPES } from '../store/UserContext';
import { UserContext } from '../store/UserContext';
import CustomLoader from '../components/Loader';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken =
	'pk.eyJ1IjoibGdvbnphbGV6MjMiLCJhIjoiY2wwenZhamR0MmV0NDNqcG5hMWU2M2s0cyJ9.Mjxgu8Y0_Bow8OmWuGDWwg';

export async function getServerSideProps(context) {
	const token = context.req.cookies['next-auth.session-token'];

	return {
		props: {
			mockDataContacts,
		},
	};
}

export default function Home() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	// const [lng, setLng] = useState(null);
	// const [lat, setLat] = useState(null);
	const [zoom, setZoom] = useState(9);
	const { data: session } = useSession();
	const { colors } = useColors();

	const { state, dispatch } = useContext(UserContext);
	const { lat, long } = state.coords;

	const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
		useTrackLocation();

	useEffect(() => {
		handleTrackLocation();
		// setLat(state.coords.lat);
		// setLng(state.coords.long);
		dispatch({
			type: ACTION_TYPES.SET_LATLONG,
			payload: {
				latlong: `${long},${lat}`,
				lat: lat,
				long: long,
			},
		});
	}, []);

	useEffect(() => {
		if (!lat || !long) return;
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [long, lat],
			zoom: zoom,
		});
	});

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			dispatch({
				type: ACTION_TYPES.SET_LATLONG,
				payload: {
					latlong: `${long},${lat}`,
					lat: map.current.getCenter().lat.toFixed(4),
					long: map.current.getCenter().lng.toFixed(4),
				},
			});
			setZoom(map.current.getZoom().toFixed(2));
		});
	});

	return (
		<Box className={styles.container}>
			<Head>
				<title>Leftovers</title>
				<meta name='description' content='The largest meal sharing app' />
			</Head>

			<main className={styles.main}>
				<NavBar />
				<Box className={styles.title}>
					<Typography
						variant='h1'
						lineHeight={1.15}
						fontSize='4rem'
						color={colors.orangeAccent[900]}>
						Welcome to Leftovers!
					</Typography>
				</Box>
				<p>The largest meal sharing app in the world</p>
				<Box>
					<Typography>{locationErrorMsg && locationErrorMsg}</Typography>
					<Typography>
						{state.coords.latlong !== null
							? state.coords.latlong
							: 'no coords available'}
					</Typography>
					{isFindingLocation && <CustomLoader />}
					<Box className={styles.mapc}>
						{/* <div className={styles.sidebar}>
						Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
					</div> */}
						<Box
							width={'800px'}
							height='400px'
							className={styles.mapContainer}
							ref={mapContainer}
						/>
					</Box>
				</Box>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer>
		</Box>
	);
}
