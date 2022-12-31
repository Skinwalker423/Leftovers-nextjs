import * as React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useColors } from '../../hooks/useColors';
import Copyright from './copyright';
import ProfessionalIconList from './ProfessionalIconList';

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
					<Copyright link='/' />
				</Container>
			</Box>
		</Box>
	);
}
