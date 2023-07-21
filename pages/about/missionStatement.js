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

const missionStatement = () => {
	const { colors } = useColors();
	return (
		<Box width={'100%'}>
			<Head>
				<title>Mission Statement</title>
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
							Mission Statement
						</Typography>
					</Box>
					<AboutNavLink href="/about" title="Back to About Us" />
				</Box>
			</header>

			<Box
				m={5}
				display={'flex'}
				justifyContent={'center'}
				mx={'1.5em'}
				textOverflow={'clip'}
			>
				<Typography fontSize={'large'} component={'p'} sx={{ width: '50em' }}>
					Velit sint laboris labore laboris dolore aute veniam quis. Id ex
					pariatur incididunt consequat sunt ullamco id consequat. Adipisicing
					qui cupidatat ipsum aliquip. Consectetur id ipsum anim ipsum do
					laborum ad commodo ea cupidatat aute laborum consequat dolor.
					<br />
					<br />
					Est aliquip ipsum magna excepteur sit duis occaecat ea cillum. Id nisi
					elit reprehenderit aute deserunt ullamco cillum do consectetur irure
					do. Cillum qui non amet ea elit ut. Occaecat qui aliqua non labore in
					eiusmod reprehenderit. Ex magna nisi dolore culpa nisi veniam aliqua
					duis. Consectetur quis do tempor sint consequat consectetur dolor.
					<br />
					<br />
					Laboris id anim est sunt nulla sunt aliqua dolor eiusmod tempor magna
					nulla quis duis. Est cupidatat duis ea nisi duis velit cillum magna
					nostrud mollit do mollit. Dolor duis occaecat elit nisi nulla amet
					enim commodo quis tempor. Nisi et mollit consectetur incididunt
					laborum eu consectetur irure labore ex laboris dolore magna fugiat.
					Irure commodo quis cupidatat officia officia cupidatat. Dolore nisi
					officia voluptate incididunt cillum fugiat ad fugiat labore nulla
					culpa consectetur exercitation.
				</Typography>
			</Box>
			<Box>
				<PromoSection />
				<PromoSection reverse />
			</Box>

			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default missionStatement;
