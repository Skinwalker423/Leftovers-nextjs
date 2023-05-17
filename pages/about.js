import React from 'react';
import Head from 'next/head';
import Footer from '../components/layout/footer/footer';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PromoSection from '../components/landingPagePromos/promoSection';
import { useColors } from '../hooks/useColors';

export async function getStaticProps() {
	return {
		props: {}
	};
}

const About = () => {
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
					height={'50vh'}
					display={'flex'}
					backgroundColor={colors.primary[400]}
					justifyContent="center"
					alignItems={'center'}
				>
					<Box position={'relative'}>
						<Typography
							fontWeight={800}
							color={'secondary'}
							fontSize={'5em'}
							variant="h1"
						>
							Mission Statement
						</Typography>
					</Box>
				</Box>
			</header>
			<main>
				<Box>
					<PromoSection />
					<PromoSection reverse />
				</Box>
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default About;
