import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import PrivacyStatement from '../../components/about/policies/privacyStatement';
import AboutBanner from '../../components/about/AboutBanner';

export async function getStaticProps() {
	return {
		props: {}
	};
}

const PrivacyPolicy = () => {
	return (
		<Box width={'100%'}>
			<Head>
				<title>About Us</title>
				<meta
					name="description"
					content="Leftovers is dedicated to providing a platform that allows neighbors to share their excess meals with others in the community"
				/>
			</Head>
			<AboutBanner
				header="Privacy Policy"
				link="/about"
				linkTitle="Back to About"
			/>

			<Box
				m={5}
				display={'flex'}
				justifyContent={'center'}
				mx={'1.5em'}
				textOverflow={'clip'}
			>
				<PrivacyStatement />
			</Box>

			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default PrivacyPolicy;
