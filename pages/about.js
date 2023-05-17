import React from 'react';
import Box from '@mui/material/Box';
import Head from 'next/head';

export async function getStaticProps() {
	return {
		props: {}
	};
}

const About = () => {
	return (
		<Box>
			<Head>
				<title>About Us</title>
				<meta
					name="description"
					content="Leftovers is dedicated to providing a platform that allows neighbors to share their excess meals with others in the community"
				/>
			</Head>
		</Box>
	);
};

export default About;
