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
import Link from 'next/link';

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
							p: '3rem',
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							position: { xs: 'unset', lg: 'absolute' },
							right: { xs: 'unset', lg: 100 }
						}}
					>
						<Link
							style={{ textDecoration: 'none' }}
							href={'/about/missionStatement'}
						>
							<Box
								width={'17rem'}
								height={'3.5rem'}
								display={'flex'}
								backgroundColor={colors.orangeAccent[600]}
								borderRadius={'.5em'}
								color={'white'}
								justifyContent={'center'}
								alignItems={'center'}
								sx={{
									':hover': {
										backgroundColor: colors.orangeAccent[400]
									}
								}}
							>
								<Typography variant="h3">Mission Statement</Typography>
							</Box>
						</Link>
						<Link
							style={{ textDecoration: 'none' }}
							href={'/about/joinTheCommunity'}
						>
							<Box
								width={'17rem'}
								height={'3.5rem'}
								display={'flex'}
								backgroundColor={colors.orangeAccent[600]}
								borderRadius={'.5em'}
								color={'white'}
								justifyContent={'center'}
								alignItems={'center'}
								sx={{
									':hover': {
										backgroundColor: colors.orangeAccent[400]
									}
								}}
							>
								<Typography variant="h3">Join the Community</Typography>
							</Box>
						</Link>
						<Link
							style={{ textDecoration: 'none' }}
							href={'/about/privacyPolicy'}
						>
							<Box
								width={'17rem'}
								height={'3.5rem'}
								display={'flex'}
								backgroundColor={colors.orangeAccent[600]}
								borderRadius={'.5em'}
								color={'white'}
								justifyContent={'center'}
								alignItems={'center'}
								sx={{
									':hover': {
										backgroundColor: colors.orangeAccent[400]
									}
								}}
							>
								<Typography variant="h3">Privacy Policy</Typography>
							</Box>
						</Link>
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
					{/* <Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						height={'30rem'}
						p={'1rem'}
						width={'35rem'}
					>
						<Paper
							sx={{
								width: '100%',
								height: '100%',
								p: '1rem',
								display: 'flex',
								flexDirection: 'column',
								gap: 3
							}}
						>
							<Link
								style={{ textDecoration: 'none' }}
								href={'/about/missionStatement'}
							>
								<Box
									width={'20rem'}
									height={'4rem'}
									display={'flex'}
									backgroundColor={colors.orangeAccent[600]}
									borderRadius={'.5em'}
									color={'white'}
									justifyContent={'center'}
									alignItems={'center'}
								>
									<Typography variant="h2">Mission Statement</Typography>
								</Box>
							</Link>
							<Link
								style={{ textDecoration: 'none' }}
								href={'/about/joinTheCommunity'}
							>
								<Box
									width={'20rem'}
									height={'4rem'}
									display={'flex'}
									backgroundColor={colors.orangeAccent[600]}
									borderRadius={'.5em'}
									color={'white'}
									justifyContent={'center'}
									alignItems={'center'}
								>
									<Typography variant="h2">Join the Community</Typography>
								</Box>
							</Link>
							<Link
								style={{ textDecoration: 'none' }}
								href={'/about/privacyPolicy'}
							>
								<Box
									width={'20rem'}
									height={'4rem'}
									display={'flex'}
									backgroundColor={colors.orangeAccent[600]}
									borderRadius={'.5em'}
									color={'white'}
									justifyContent={'center'}
									alignItems={'center'}
								>
									<Typography variant="h2">Privacy Policy</Typography>
								</Box>
							</Link>
						</Paper>
					</Box> */}
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
