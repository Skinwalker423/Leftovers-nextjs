import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Paper, Alert } from '@mui/material';
import CustomLoader from '../../components/UI/Loader';
import { fetchPrepper } from '../../utils/fetchPrepper';
import FoodItemCard from '../../components/Card/foodItemCard';
import Head from 'next/head';
import Image from 'next/image';
import {
	findAllInCollection,
	connectMongoDb,
} from '../../db/mongodb/mongoDbUtils';

import SuccessAlert from '../../components/UI/alert/successAlert';
import TrophyLikesButton from '../../components/likes/trophyLikesButton';

export async function getStaticProps({ params }) {
	const prepperId = params.pid;
	try {
		const prepperData = await fetchPrepper(prepperId);

		if (!prepperData || prepperData.error) {
			return { notFound: true };
		}

		return {
			props: {
				prepper: prepperData ? prepperData : [],
			},

			revalidate: 60, // In seconds
		};
	} catch (err) {
		return { notFound: true };
	}
}

export async function getStaticPaths() {
	const client = await connectMongoDb();
	const allPreppers = await findAllInCollection(client, 'preppers');

	const paths = allPreppers.map(({ id }) => ({
		params: { pid: id },
	}));

	return { paths, fallback: true };
}

const Prepper = ({ prepper }) => {
	const router = useRouter();
	const [meals, setMeals] = useState([]);
	const [msg, setMsg] = useState('');

	useEffect(() => {
		if (prepper && prepper.meals) {
			setMeals(prepper.meals);
		}
	}, [meals]);

	const prepperId = router.query.pid;
	if (router.isFallback || !prepperId) {
		return (
			<Box>
				<Head>
					<title>Loading...</title>
					<meta name='description' content='loading content' />
				</Head>
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
			<Head>
				<title>{prepper.kitchenTitle}</title>
				<meta name='description' content={prepper.description} />
			</Head>
			<Box
				mt='100px'
				display='flex'
				flexDirection={'column'}
				width='100%'
				justifyContent='center'
				alignItems='center'>
				<Paper
					sx={{
						width: { xs: '100%', lg: '80%' },
						height: '40vh',
						p: '1em',
						position: 'relative',
					}}>
					<Image src={'/pixzolo.jpg'} fill alt={prepper.kitchenTitle} />
					<Box
						position={'relative'}
						display='flex'
						height={'100%'}
						flexDirection={'column'}
						alignItems={'center'}
						justifyContent={'space-between'}>
						<Box>
							<Typography textAlign={'center'} variant='h1' color={'error'}>
								{prepper.kitchenTitle}
							</Typography>
							<Typography variant='h2'>{prepper.description}</Typography>
						</Box>
						<Box>
							<Typography variant='h2'>{prepper.email}</Typography>
							<TrophyLikesButton />
						</Box>
					</Box>
				</Paper>
			</Box>
			{!prepper.meals.length && (
				<Box width='50%'>
					<Alert color='error' fontSize='large'>
						<Typography variant='h3'>
							Meals are currently unavailbale. Check back soon
						</Typography>
					</Alert>
				</Box>
			)}
			{prepper.meals.length && meals.length !== 0 ? (
				<Box
					display={'flex'}
					my='2rem'
					flexWrap={'wrap'}
					gap={10}
					height='100%'
					justifyContent={'center'}
					alignItems={'center'}
					width={{ xs: '100%', lg: '70%' }}>
					{meals.map(({ price, image, description, title, id, qty = 1 }) => {
						return (
							<Box key={id} width={375}>
								<FoodItemCard
									key={title}
									foodItem={title}
									image={image === '' ? '/art.jpg' : image}
									price={price}
									description={description}
									id={id}
									qty={qty}
									setMsg={setMsg}
									prepperEmail={prepper.email}
								/>
							</Box>
						);
					})}
				</Box>
			) : (
				<Box mt={'3rem'}>
					<CustomLoader />
				</Box>
			)}
			{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
		</Box>
	);
};

export default Prepper;
