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

export async function getServerSideProps(context) {
	const token = context.req.cookies['next-auth.session-token'];

	return {
		props: {
			mockDataContacts,
		},
	};
}

export default function Home() {
	const { colors } = useColors();
	const { data: session } = useSession();
	const router = useRouter();
	const [zipCode, setZipCode] = useState('');
	const [localPreppers, setLocalPreppers] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {}, []);

	const handleZipSearchForm = async (e) => {
		e.preventDefault();
		console.log('submitted');
		const findPreppers = await fetchLocalPreppers(zipCode);
		console.log(findPreppers);
		if (findPreppers) {
			setLocalPreppers(findPreppers);
		} else {
			setErrorMsg('could not find local preppers. Try another zip code');
		}
	};

	const handleZipChange = (e) => {
		const zip = e.target.value;
		console.log(zip);
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
				<form onSubmit={handleZipSearchForm}>
					<FormControl>
						<InputLabel htmlFor='my-input'>Zip Code</InputLabel>
						<Box display={'flex'}>
							<Input
								value={zipCode}
								onChange={handleZipChange}
								id='my-input'
								aria-describedby='my-helper-text'
							/>
							<IconButton type='submit'>S</IconButton>
						</Box>
					</FormControl>
				</form>
				<Box
					m={'50px'}
					width={'100%'}
					display={'flex'}
					justifyContent='center'
					flexWrap='wrap'>
					{localPreppers &&
						localPreppers.map((prepper) => {
							const avatar = 'https://i.pravatar.cc/300';
							return (
								<Link
									className={styles.prepCard}
									key={prepper.id}
									href={`/preppers/${prepper.id}`}>
									<PrepperCard
										title={prepper.name}
										subTitle={prepper.email}
										avatar={avatar}
										id={prepper.id}
									/>
								</Link>
							);
						})}
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
