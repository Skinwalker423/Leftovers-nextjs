import React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PromoSection = ({
	reverse = false,
	btnText = 'FIND PREPPERS',
	link = '/',
	bgColor = 'primary',
	imgUrl = '/images/cooking/homecooking.jpg',
	title = 'Everything you crave, homecooked.',
	description = "Get a slice of homemade apple pie or pick up authentic backyard ribs from the best cooks in your community that you've heard so much about."
}) => {
	return (
		<Box
			display={'flex'}
			alignItems={'center'}
			flexDirection={{ xs: 'column', lg: reverse ? 'row-reverse' : 'row' }}
			justifyContent={'center'}
			width={'100%'}
			height={{ xs: '45em', sm: '50em', md: '60em', lg: '70em' }}
			p={{ xs: '2em', lg: '5em' }}
			gap={5}
			backgroundColor={bgColor}
		>
			<Box
				position={'relative'}
				width={{ xs: '100%', sm: '90%', md: '80%', lg: '80%', xl: '65%' }}
				height={{ xs: '50%', sm: '60%', md: '75%', lg: '70%', xl: '75%' }}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Image src={imgUrl} fill alt={'family preparing food'} />
			</Box>
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				gap={2}
			>
				<Typography color={'secondary'} textAlign={'center'} variant="h2">
					{title}
				</Typography>
				<Typography
					sx={{ mx: { xs: '1em', md: '5em' } }}
					fontSize={'medium'}
					textAlign={'center'}
				>
					{description}
				</Typography>
				<Link href={link}>
					<Button variant="contained" color="error">
						{btnText}
					</Button>
				</Link>
			</Box>
		</Box>
	);
};

export default PromoSection;
