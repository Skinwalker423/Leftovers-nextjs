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

	const professionalListConfig = [
		{
			link: 'https://www.facebook.com',
			icon: (
				<FacebookIcon sx={{ color: colors.blueAccent[500] }} fontSize="large" />
			)
		},
		{
			link: 'https://github.com/Skinwalker423',
			icon: <GitHubIcon fontSize="large" />
		},
		{
			link: 'https://twitter.com',
			icon: (
				<TwitterIcon sx={{ color: colors.blueAccent[500] }} fontSize="large" />
			)
		},
		{
			link: 'https://www.linkedin.com',
			icon: <LinkedInIcon fontSize="large" />
		}
	];

	return (
		<Box
			display={'flex'}
			justifyContent="space-evenly"
			mt="50px"
			alignItems={'center'}
		>
			{professionalListConfig.map(({ link, icon }) => {
				return (
					<IconLinkItem key={link} link={link}>
						{icon}
					</IconLinkItem>
				);
			})}
		</Box>
	);
};

export default ProfessionalIconList;
