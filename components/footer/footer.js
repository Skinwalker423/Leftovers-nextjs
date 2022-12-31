import * as React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import Copyright from './copyright';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';

export default function Footer() {
	const { colors } = useColors();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '50vh',
				backgroundColor: colors.primary[400],
				width: '100%',
				padding: '0',
				margin: '0',
			}}>
			<Container
				component='main'
				sx={{ mt: 8, mb: 2, justifyContent: 'center', alignItems: 'center' }}
				maxWidth='sm'>
				<Typography
					textAlign={'center'}
					variant='h2'
					component='h1'
					gutterBottom>
					<Image src={'/icons8-connect.svg'} width={26} height={26} />
					Leftovers
				</Typography>
				<Box display={'flex'} justifyContent='center'>
					<FacebookIcon
						sx={{ color: colors.blueAccent[500] }}
						fontSize='large'
					/>
					<GitHubIcon fontSize='large' />
					<TwitterIcon
						sx={{ color: colors.blueAccent[500] }}
						fontSize='large'
					/>
					<LinkedInIcon fontSize='large' />
				</Box>
			</Container>
			<Box
				component='footer'
				sx={{
					py: 3,
					px: 2,
					mt: 'auto',
					backgroundColor: colors.primary[400],
				}}>
				<Container>
					<Copyright link='/' />
				</Container>
			</Box>
		</Box>
	);
}
