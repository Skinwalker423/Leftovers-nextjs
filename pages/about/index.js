import React from 'react';
import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PromoSection from '../../components/landingPagePromos/promoSection';
import LandingCardList from '../../components/landingPagePromos/LandingCardList';
import { useColors } from '../../hooks/useColors';
import AboutNavLink from '../../components/UI/button/aboutNavLink';

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
					height={{ xs: '65vh', md: '55vh' }}
					display={'flex'}
					gap={3}
					backgroundColor={colors.primary[400]}
					justifyContent="center"
					alignItems={'center'}
					flexDirection={{ xs: 'column', md: 'row' }}
				>
					<Box position={'relative'}>
						<Typography
							fontWeight={800}
							color={'secondary'}
							fontSize={{ xs: '3em', sm: '4em', md: '5em' }}
							variant="h1"
						>
							About Us
						</Typography>
					</Box>
					<Paper
						sx={{
							p: '2.5rem',
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							position: { xs: 'unset', lg: 'absolute' },
							right: { xs: 'unset', lg: 100 }
						}}
					>
						<AboutNavLink
							href="/about/missionStatement"
							title="Mission Statement"
						/>
						<AboutNavLink
							href="/about/joinTheCommunity"
							title="Join the Community"
						/>
						<AboutNavLink href="/about/privacyPolicy" title="Privacy Policy" />
						<AboutNavLink href="/about/faq" title="FAQ's" />
					</Paper>
				</Box>
			</header>
			<main>
				<Box
					width={'100%'}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					flexDirection={'column'}
					textOverflow={'clip'}
				>
					<LandingCardList />
				</Box>
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default About;
