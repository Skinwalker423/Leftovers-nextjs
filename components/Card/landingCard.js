import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useColors } from '../../hooks/useColors';
import React from 'react';
import { Typography } from '@mui/material';

const LandingCard = ({
	image = '/images/alegria/prepper2.png',
	title = 'Become a food prepper',
	description = 'Make your favorite meals that only you can make and share them with those around you',
	linkText = 'Learn More'
}) => {
	const { colors } = useColors();

	return (
		<Box
			sx={{
				position: 'relative',
				width: 400,
				height: '500px',
				// backgroundColor: colors.orangeAccent[900],
				// border: '1px solid orange',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}
		>
			<Box position={'relative'} width={'100%'} height={'50%'}>
				<Image src={image} width={398} height={300} alt={title} />
			</Box>
			<Stack gap={3} sx={{ alignItems: 'center' }} p={'2.5em'}>
				<Typography variant="h2" fontWeight={600}>
					{title}
				</Typography>
				<Typography>{description}</Typography>

				<Link style={{ textDecoration: 'none' }} href={'/'}>
					<Typography
						sx={{ display: 'flex', alignItems: 'center' }}
						fontSize={'large'}
						color={'error'}
					>
						{linkText}
						<ArrowRightAltIcon color={colors.redAccent[100]} />
					</Typography>
				</Link>
			</Stack>
		</Box>
	);
};

export default LandingCard;
