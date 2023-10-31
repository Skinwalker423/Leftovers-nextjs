import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PromoSection from '../../components/landingPagePromos/promoSection';
import { useColors } from '../../hooks/useColors';
import AboutBanner from '../../components/about/AboutBanner';

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
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<AboutBanner
				header="Join The Community"
				link="/about"
				linkTitle="Back to About"
			/>
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				textOverflow={'clip'}
				width={{ xs: '90vw', sm: '100vw' }}
				my={5}
				px={5}
			>
				<Typography variant="h2">What does it mean to be a prepper?</Typography>
				<br />
				<Typography
					fontSize={'large'}
					component={'p'}
					sx={{
						width: { xs: '22rem', sm: '30rem', md: '40rem', lg: '50rem' },
						px: 2
					}}
				>
					Velit sint laboris labore laboris dolore aute veniam quis. Id ex
					pariatur incididunt consequat sunt ullamco id consequat. Adipisicing
					qui cupidatat ipsum aliquip. Consectetur id ipsum anim ipsum do
					laborum ad commodo ea cupidatat aute laborum consequat dolor.
				</Typography>
				<br />

				<Typography
					fontSize={'large'}
					component={'p'}
					sx={{
						width: { xs: '22rem', sm: '30rem', md: '40rem', lg: '50rem' },
						px: 2
					}}
				>
					Est aliquip ipsum magna excepteur sit duis occaecat ea cillum. Id nisi
					elit reprehenderit aute deserunt ullamco cillum do consectetur irure
					do. Cillum qui non amet ea elit ut. Occaecat qui aliqua non labore in
					eiusmod reprehenderit. Ex magna nisi dolore culpa nisi veniam aliqua
					duis. Consectetur quis do tempor sint consequat consectetur dolor.
				</Typography>
				<br />
				<Typography variant="h2">What is required</Typography>
				<br />
				<Typography
					fontSize={'large'}
					component={'p'}
					sx={{
						width: { xs: '22rem', sm: '30rem', md: '40rem', lg: '50rem' },
						px: 2
					}}
				>
					Laboris id anim est sunt nulla sunt aliqua dolor eiusmod tempor magna
					nulla quis duis. Est cupidatat duis ea nisi duis velit cillum magna
					nostrud mollit do mollit. Dolor duis occaecat elit nisi nulla amet
					enim commodo quis tempor. Nisi et mollit consectetur incididunt
					laborum eu consectetur irure labore ex laboris dolore magna fugiat.
					Irure commodo quis cupidatat officia officia cupidatat. Dolore nisi
					officia voluptate incididunt cillum fugiat ad fugiat labore nulla
					culpa consectetur exercitation.
				</Typography>
				<br />
				<Typography variant="h2">Start Today!</Typography>
				<br />
				<Typography
					fontSize={'large'}
					component={'p'}
					sx={{
						width: { xs: '22rem', sm: '30rem', md: '40rem', lg: '50rem' },
						px: 2
					}}
				>
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
				<PromoSection bgColor={colors.primary[400]} />
				<PromoSection reverse />
			</Box>

			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default joinTheCommunity;
