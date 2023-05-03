import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import React from 'react';
import { Typography } from '@mui/material';

const LandingCard = ({
	image = '/images/alegria/prepper2.png',
	title = 'Become a food prepper'
}) => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: 400,
				height: '500px',
				backgroundColor: 'white'
			}}
		>
			<Box position={'relative'} width={'100%'} height={'50%'}>
				<Image src={image} fill alt={title} />
			</Box>
			<Stack gap={3} sx={{ alignItems: 'center' }} p={'2.5em'}>
				<Typography variant="h2" fontWeight={600}>
					{title}
				</Typography>
				<Typography>
					Make your favorite meals that only you can make and share them with
					those around you
				</Typography>

				<Link href={'/'}>
					<Typography
						sx={{ display: 'flex', alignItems: 'center' }}
						fontSize={'large'}
						color={'error'}
					>
						Learn more
						<ArrowRightAltIcon color="red" />
					</Typography>{' '}
				</Link>
			</Stack>
		</Box>
	);
};

export default LandingCard;
