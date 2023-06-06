import React from 'react';
import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PromoSection from '../../components/landingPagePromos/promoSection';
import { useColors } from '../../hooks/useColors';
import AboutNavLink from '../../components/UI/button/aboutNavLink';

export async function getStaticProps() {
	return {
		props: {}
	};
}

const joinTheCommunity = () => {
	const { colors } = useColors();
	return (
		<Box width={'100%'}>
			<Head>
				<title>About Us - Join the community</title>
				<meta
					name="description"
					content="Learn how to become a meal preparer from your home and start sharing your creations with your community"
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
							Join The Community
						</Typography>
					</Box>
					<AboutNavLink href="/about" title="Back to About Us" />
				</Box>
			</header>
			<main>
				<Box
					m={5}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					mx={'1.5em'}
					textOverflow={'clip'}
				>
					<Typography variant="h2">
						What does it mean to be a prepper?
					</Typography>
					<br />
					<Typography fontSize={'large'} component={'p'} sx={{ width: '50em' }}>
						Velit sint laboris labore laboris dolore aute veniam quis. Id ex
						pariatur incididunt consequat sunt ullamco id consequat. Adipisicing
						qui cupidatat ipsum aliquip. Consectetur id ipsum anim ipsum do
						laborum ad commodo ea cupidatat aute laborum consequat dolor.
					</Typography>
					<br />

					<Typography fontSize={'large'} component={'p'} sx={{ width: '50em' }}>
						Est aliquip ipsum magna excepteur sit duis occaecat ea cillum. Id
						nisi elit reprehenderit aute deserunt ullamco cillum do consectetur
						irure do. Cillum qui non amet ea elit ut. Occaecat qui aliqua non
						labore in eiusmod reprehenderit. Ex magna nisi dolore culpa nisi
						veniam aliqua duis. Consectetur quis do tempor sint consequat
						consectetur dolor.
					</Typography>
					<br />
					<Typography variant="h2">What is required</Typography>
					<br />
					<Typography fontSize={'large'} component={'p'} sx={{ width: '50em' }}>
						Laboris id anim est sunt nulla sunt aliqua dolor eiusmod tempor
						magna nulla quis duis. Est cupidatat duis ea nisi duis velit cillum
						magna nostrud mollit do mollit. Dolor duis occaecat elit nisi nulla
						amet enim commodo quis tempor. Nisi et mollit consectetur incididunt
						laborum eu consectetur irure labore ex laboris dolore magna fugiat.
						Irure commodo quis cupidatat officia officia cupidatat. Dolore nisi
						officia voluptate incididunt cillum fugiat ad fugiat labore nulla
						culpa consectetur exercitation.
					</Typography>
					<br />
					<Typography variant="h2">Start Today!</Typography>
					<br />
					<Typography fontSize={'large'} component={'p'} sx={{ width: '50em' }}>
						Laboris id anim est sunt nulla sunt aliqua dolor eiusmod tempor
						magna nulla quis duis. Est cupidatat duis ea nisi duis velit cillum
						magna nostrud mollit do mollit. Dolor duis occaecat elit nisi nulla
						amet enim commodo quis tempor. Nisi et mollit consectetur incididunt
						laborum eu consectetur irure labore ex laboris dolore magna fugiat.
						Irure commodo quis cupidatat officia officia cupidatat. Dolore nisi
						officia voluptate incididunt cillum fugiat ad fugiat labore nulla
						culpa consectetur exercitation.
					</Typography>
				</Box>
				<Box>
					<PromoSection bgColor={colors.primary[400]} />
					<PromoSection reverse />
				</Box>
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default joinTheCommunity;