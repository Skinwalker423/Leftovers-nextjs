import * as React from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import Link from 'next/link';
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
				<Box display={'flex'} justifyContent='center' alignItems='center'>
					<Image src={'/icons8-connect.svg'} width={50} height={50} />
					<Typography
						px={'20px'}
						textAlign={'center'}
						variant='h2'
						component='h1'
						gutterBottom>
						Leftovers
					</Typography>
				</Box>
				<Box
					display={'flex'}
					justifyContent='space-evenly'
					mt='50px'
					alignItems={'center'}>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href={'https://www.facebook.com'}>
						<IconButton>
							<FacebookIcon
								sx={{ color: colors.blueAccent[500] }}
								fontSize='large'
							/>
						</IconButton>
					</a>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href={'https://www.github.com'}>
						<IconButton>
							<GitHubIcon fontSize='large' />
						</IconButton>
					</a>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href={'https://www.twitter.com'}>
						<IconButton>
							<TwitterIcon
								sx={{ color: colors.blueAccent[500] }}
								fontSize='large'
							/>
						</IconButton>
					</a>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href={'https://www.linkedin.com'}>
						<IconButton>
							<LinkedInIcon fontSize='large' />
						</IconButton>
					</a>
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
