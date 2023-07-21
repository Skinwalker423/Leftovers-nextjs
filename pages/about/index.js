import React from 'react';
import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LandingCardList from '../../components/landingPagePromos/LandingCardList';
import { useColors } from '../../hooks/useColors';
import AboutNavLink from '../../components/UI/button/aboutNavLink';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

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
					content="Learn more about our Missionstatement, joining the community, privacy policy, and frequently asked questions"
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
						>
							<PublicOutlinedIcon />
						</AboutNavLink>
						<AboutNavLink
							href="/about/joinTheCommunity"
							title="Join the Community"
						>
							<PeopleOutlinedIcon />
						</AboutNavLink>
						<AboutNavLink href="/about/privacyPolicy" title="Privacy Policy">
							<PrivacyTipOutlinedIcon />
						</AboutNavLink>
						<AboutNavLink href="/about/faq" title="FAQ's">
							<QuizOutlinedIcon />
						</AboutNavLink>
					</Paper>
				</Box>
			</header>

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

			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default About;
