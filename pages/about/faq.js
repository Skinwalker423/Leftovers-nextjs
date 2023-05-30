import React from 'react';
import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BasicAccordion from '../../components/UI/accordion/BasicAccordion';
import AboutNavLink from '../../components/UI/button/aboutNavLink';
import { useColors } from '../../hooks/useColors';

export async function getStaticProps() {
	return {
		props: {}
	};
}

const faq = () => {
	const { colors } = useColors();
	return (
		<Box width={'100%'}>
			<Head>
				<title>Frequently Asked Questions</title>
				<meta
					name="description"
					content="Frequently asked questions about joining the Leftovers community"
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
							FAQ's
						</Typography>
					</Box>
					<AboutNavLink href="/about" title="Back to About Us" />
				</Box>
			</header>
			<main className={styles.main}>
				<Box
					m={5}
					p={5}
					width={'100%'}
					height={'100%'}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'flex-start'}
					alignItems={'center'}
					mx={'1.5em'}
					textOverflow={'clip'}
					gap={3}
				>
					<BasicAccordion
						title="Accordion 1"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 2"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 3"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 4"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 5"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 6"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 7"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 8"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 9"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
					<BasicAccordion
						title="Accordion 10"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget."
					/>
				</Box>
			</main>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default faq;
