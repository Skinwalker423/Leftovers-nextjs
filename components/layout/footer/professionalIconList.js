import React from 'react';
import { Box } from '@mui/material';
import { useColors } from '../../../hooks/useColors';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconLinkItem from './iconLinkItem';

const ProfessionalIconList = () => {
	const { colors } = useColors();
	return (
		<Box
			display={'flex'}
			justifyContent="space-evenly"
			mt="50px"
			alignItems={'center'}
		>
			<IconLinkItem link={'https://www.facebook.com'}>
				<FacebookIcon sx={{ color: colors.blueAccent[500] }} fontSize="large" />
			</IconLinkItem>
			<IconLinkItem link={'https://github.com/Skinwalker423'}>
				<GitHubIcon fontSize="large" />
			</IconLinkItem>
			<IconLinkItem link={'https://twitter.com/artgonzalez423'}>
				<TwitterIcon sx={{ color: colors.blueAccent[500] }} fontSize="large" />
			</IconLinkItem>
			<IconLinkItem
				link={'https://www.linkedin.com/in/luis-gonzalez-a33799235/'}
			>
				<LinkedInIcon fontSize="large" />
			</IconLinkItem>
		</Box>
	);
};

export default ProfessionalIconList;
