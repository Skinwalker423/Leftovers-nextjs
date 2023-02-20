import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Paper } from '@mui/material';
import CustomLoader from '../../components/UI/Loader';
import { fetchPrepper } from '../../utils/fetchPrepper';
import FoodItemCard from '../../components/Card/foodItemCard';
import styles from './index.module.css';

const foodItems = [
	{
		id: 1,
		item: 'Tacos',
		image: '/art.jpg',
		description: 'homemade tacos',
		price: 4.99,
		qty: 1,
	},
	{
		id: 2,
		item: 'Pan con Pavo',
		image: '/art.jpg',
		description: 'Delicious homemade chicken sandwiches',
		price: 4.99,
		qty: 1,
	},
	{
		id: 3,
		item: 'Manjar Blanco',
		image: '/art.jpg',
		description:
			'Authentic Salvadorian sweet and creamy vanilla desert topped with cinnamon',
		price: 4.99,
		qty: 1,
	},
];

export async function getStaticProps({ params }) {
	const prepperId = params.pid;

	const prepperData = await fetchPrepper(prepperId);
	console.log({ prepperData });

	return {
		props: {
			prepper: prepperData ? prepperData : [],
		},

		revalidate: 60, // In seconds
	};
}

export async function getStaticPaths() {
	const listofBannerKitchens = ['1', '2', '3'];

	const paths = listofBannerKitchens.map((prepperId) => ({
		params: { pid: prepperId },
	}));

	return { paths, fallback: 'blocking' };
}

const Prepper = ({ prepper }) => {
	const router = useRouter();
	console.log(prepper);

	const prepperId = router.query.pid;
	if (!prepperId) {
		return (
			<Box
				width='100%'
				height='100vh'
				display='flex'
				justifyContent='center'
				alignItems='center'>
				<CustomLoader
					size={75}
					progress={50}
					color={'error'}
					title='Loading...'
				/>
				;
			</Box>
		);
	}

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection={'column'}
			width={'100%'}
			height='100%'>
			<Box
				m='100px 0'
				display='flex'
				flexDirection={'column'}
				width='100%'
				justifyContent='center'
				alignItems='center'>
				<Paper sx={{ width: '70%' }}>
					<Typography variant='h1'>Prepper id: {prepperId}</Typography>
					<Typography variant='h1'> email: {prepper.email}</Typography>
					<Typography variant='h1'>
						{' '}
						address: {prepper.location.address}
					</Typography>
					<Typography variant='h1'> city: {prepper.location.city}</Typography>
				</Paper>
			</Box>
			<Box display={'flex'} width='70%'>
				{foodItems.map(({ id, item, price, image, description, qty }) => {
					return (
						<Box
							key={id}
							className={styles.prepCard}
							width='100%'
							height={'500px'}>
							<FoodItemCard
								key={id}
								foodItem={item}
								image={image}
								price={price}
								description={description}
								id={id}
								qty={qty}
							/>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default Prepper;
