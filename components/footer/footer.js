import * as React from 'react';
import { Box, Container } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import Copyright from './copyright';
import ProfessionalIconList from './ProfessionalIconList';
import LogoTitle from './logoTitle';

export default function Footer({ img = '/favicon.ico', title = 'Title' }) {
	const { colors } = useColors();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '10vh',
				backgroundColor: colors.primary[400],
				width: '100%',
				padding: '0',
				margin: '0',
			}}>
			<Container
				component='main'
				sx={{ mt: 8, mb: 2, justifyContent: 'center', alignItems: 'center' }}
				maxWidth='sm'>
				<LogoTitle title={title} img={img} />
				<ProfessionalIconList />
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
					<Copyright company={title} link='/' />
				</Container>
			</Box>
		</Box>
	);
}
