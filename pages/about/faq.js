import React from 'react';
import Head from 'next/head';
import Footer from '../../components/layout/footer/footer';
import styles from '../../styles/Home.module.css';
import Box from '@mui/material/Box';
import BasicAccordion from '../../components/UI/accordion/BasicAccordion';
import { useColors } from '../../hooks/useColors';
import AboutBanner from '../../components/about/AboutBanner';

const questions = [
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	},
	{
		question: 'accordion',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortiseget.'
	}
];

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
			<AboutBanner header="FAQ" link="/about" linkTitle="Back to About" />
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
				{questions.map(({ question, answer }, index) => {
					return (
						<BasicAccordion
							key={index}
							title={`${question} ${index}`}
							description={answer}
						/>
					);
				})}
			</Box>
			<footer className={styles.footer}>
				<Footer img={'/icons8-connect.svg'} title="Leftovers" />
			</footer>
		</Box>
	);
};

export default faq;
