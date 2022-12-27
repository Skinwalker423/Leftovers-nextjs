import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
	Box,
	Typography,
	Input,
	Paper,
	IconButton,
	FormControl,
	InputLabel,
	TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSession } from 'next-auth/react';
import { useColors } from '../hooks/useColors';
import NavBar from '../components/global/NavBar';
import { mockDataContacts } from '../data/mockData';
import { useEffect, useContext, useState, useRef } from 'react';
import { ACTION_TYPES } from '../store/UserContext';
import { UserContext } from '../store/UserContext';
import CustomLoader from '../components/Loader';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';
import { fetchLocalPreppers } from '../utils/fetchLocalPreppers';
import PrepperCard from '../components/Card';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalPreppersList from '../components/prepperLists/localPreppersList';

export async function getServerSideProps(context) {
	const token = context.req.cookies['next-auth.session-token'];

	return {
		props: {
			mockDataContacts,
		},
	};
}

export default function Home({ mockDataContacts }) {
	const { colors } = useColors();
	const { data: session } = useSession();
	const router = useRouter();
	const [zipCode, setZipCode] = useState('');
	const [localPreppers, setLocalPreppers] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');

	const handleZipSearchForm = async (e) => {
		e.preventDefault();
		const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
		if (!isValidZip) {
			setErrorMsg('Invalid zip code');
			return;
		}
		console.log('submitted');
		setErrorMsg('');
		const findPreppers = await fetchLocalPreppers(zipCode);
		console.log(findPreppers);
		if (findPreppers.length !== 0) {
			setLocalPreppers(findPreppers);
		} else {
			setErrorMsg('could not find local preppers. Try another zip code');
		}
	};

	const handleZipChange = (e) => {
		const zip = e.target.value;
		setZipCode(zip);
	};

	return (
		<Box className={styles.container}>
			<Head>
				<title>Leftovers</title>
				<meta name='description' content='The largest meal sharing app' />
			</Head>
			<main className={styles.main}>
				<NavBar />
				<Box
					position={'absolute'}
					top='0'
					height={'75vh'}
					width='100%'
					className={styles.title}>
					<Image fill src={'/ball-park.jpg'} alt='landing page image' />
				</Box>
				<Typography
					variant='h1'
					zIndex={10}
					lineHeight={1.15}
					fontSize='4rem'
					color='white'>
					Welcome to Leftovers!
				</Typography>
				<Box mt='100px'>
					<form onSubmit={handleZipSearchForm}>
						<FormControl>
							<Box
								className={styles.searchBox}
								sx={{
									display: 'flex',
									alignItems: 'flex-end',
									backgroundColor: colors.blueAccent[900],
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '5px',
									width: '600px',
									height: '70px',
									padding: '20px',
								}}>
								<AccountCircle
									sx={{
										color: 'action.active',
										mr: 3,
										my: 0.5,
									}}
								/>
								<TextField
									id='input-with-sx'
									label='Enter your current zip code'
									variant='standard'
									fullWidth
									color='warning'
									onChange={handleZipChange}
									helperText={errorMsg ? errorMsg : ''}
								/>
								<ArrowForwardOutlinedIcon
									sx={{ color: 'action.active', mr: 1, my: 0.5 }}
								/>
							</Box>
						</FormControl>
					</form>
				</Box>
				<LocalPreppersList localPreppers={localPreppers} />
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
