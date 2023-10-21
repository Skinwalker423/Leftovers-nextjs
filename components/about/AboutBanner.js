import React from 'react';
import { useColors } from '../../hooks/useColors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AboutNavLink from '../UI/button/aboutNavLink';

const AboutBanner = ({
	header = 'Title here',
	linkTitle = 'Link Title',
	link = '/'
}) => {
	const { colors } = useColors();
	return (
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
						{header}
					</Typography>
				</Box>
				<AboutNavLink href={link} title={linkTitle} />
			</Box>
		</header>
	);
};

export default AboutBanner;
