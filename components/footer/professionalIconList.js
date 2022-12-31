import React from 'react';
import { Box } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconLinkItem from './IconLinkItem';

const ProfessionalIconList = () => {
	const { colors } = useColors();
	return (
		<Box
			display={'flex'}
			justifyContent='space-evenly'
			mt='50px'
			alignItems={'center'}>
			<IconLinkItem link={'https://www.facebook.com'}>
				<FacebookIcon sx={{ color: colors.blueAccent[500] }} fontSize='large' />
			</IconLinkItem>
			<IconLinkItem link={'https://www.github.com'}>
				<GitHubIcon fontSize='large' />
			</IconLinkItem>
			<IconLinkItem link={'https://www.twitter.com'}>
				<TwitterIcon sx={{ color: colors.blueAccent[500] }} fontSize='large' />
			</IconLinkItem>
			<IconLinkItem link={'https://www.linkedin.com'}>
				<LinkedInIcon fontSize='large' />
			</IconLinkItem>
		</Box>
	);
};

export default ProfessionalIconList;
