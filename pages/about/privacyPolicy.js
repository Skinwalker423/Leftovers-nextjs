import React from 'react';
import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PrivacyStatement from '../../components/policies/privacyStatement';
import AboutNavLink from '../../components/UI/button/aboutNavLink';
import { useColors } from '../../hooks/useColors';

export async function getStaticProps() {
	return {
		props: {}
	};
}

const PrivacyPolicy = () => {
	const { colors } = useColors();
	return (
		<Box width={'100%'}>
			<Head>
				<title>About Us</title>
				<meta
					name="description"
					content="Leftovers is dedicated to providing a platform that allows neighbors to share their excess meals with others in the community"
				/>
			</Head>
			<header>
				<Box
					width={'100%'}
					height={{ xs: '40vh', md: '55vh' }}
					display={'flex'}
					flexDirection={'column'}
					backgroundColor={colors.primary[400]}
					justifyContent="space-evenly"
					alignItems={'center'}
				>
					<Box my={'5rem'} position={'relative'}>
						<Typography
							fontWeight={800}
							color={'secondary'}
							fontSize={{ xs: '3em', sm: '4em', md: '5em' }}
							variant="h1"
						>
							Privacy Policy
						</Typography>
					</Box>
					<AboutNavLink href="/about" title="Back to About Us" />
				</Box>
			</header>
			<main>
				<Box
					m={5}
					display={'flex'}
					justifyContent={'center'}
					mx={'1.5em'}
					textOverflow={'clip'}
				>
					<PrivacyStatement />
				</Box>
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default PrivacyPolicy;
