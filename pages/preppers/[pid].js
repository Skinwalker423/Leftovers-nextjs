import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Alert, Divider } from '@mui/material';
import CustomLoader from '../../components/UI/Loader';
import FoodItemCard from '../../components/Card/foodItemCard';
import Head from 'next/head';
import Image from 'next/image';
import {
	findAllInCollection,
	connectMongoDb,
	findExistingPrepperWithId
} from '../../db/mongodb/mongoDbUtils';

import SuccessAlert from '../../components/UI/alert/successAlert';
import TrophyLikesButton from '../../components/likes/trophyLikesButton';
import { useColors } from '../../hooks/useColors';

export async function getStaticProps({ params }) {
	const prepperId = params.pid;
	const client = await connectMongoDb();
	const prepperData = await findExistingPrepperWithId(client, prepperId);

	if (!prepperData) {
		return { notFound: true };
	}

	return {
		props: {
			prepper: prepperData ? prepperData : []
		},

		revalidate: 60 // In seconds
	};
}

export async function getStaticPaths() {
	const client = await connectMongoDb();
	const allPreppers = await findAllInCollection(client, 'preppers');

	const paths = allPreppers.map(({ id }) => ({
		params: { pid: id }
	}));

	return { paths, fallback: true };
}

const Prepper = ({ prepper }) => {
	if (!prepper) return 'nothing here';
	const router = useRouter();
	const [meals, setMeals] = useState([]);
	const [msg, setMsg] = useState('');
	const { colors } = useColors();

	const bannerImage = prepper?.kitchenImgUrl || '/art.jpg';

	const devBannerImg =
		process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true'
			? '/art.jpg'
			: bannerImage;

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
					<meta name="description" content="loading content" />
				</Head>
				<CustomLoader
					size={75}
					progress={50}
					color={'error'}
					title="Loading..."
				/>
				;
			</Box>
		);
	}

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection={'column'}
			width={'100%'}
		>
			<Head>
				<title>{prepper.kitchenTitle}</title>
				<meta name="description" content={prepper.description} />
			</Head>
			<Box
				display="flex"
				flexDirection={'column'}
				width="100%"
				height={'50vh'}
				justifyContent="center"
				alignItems="center"
				position={'relative'}
				top={0}
			>
				<Image src={devBannerImg} fill alt={prepper.kitchenTitle} priority />
			</Box>
			<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<Box
					position={'relative'}
					borderRadius={'1em'}
					display="flex"
					padding={'2em'}
					flexDirection={'column'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Box>
						<Typography
							textAlign={'center'}
							fontWeight={900}
							fontSize={{ xs: '3rem', lg: '5rem' }}
							variant="h1"
							color={colors.orangeAccent[300]}
						>
							{prepper.kitchenTitle}
						</Typography>
						<Typography textAlign={'center'} color={'primary'} variant="h2">
							{prepper.description}
						</Typography>
					</Box>
					<Box>
						<TrophyLikesButton mealsServed={prepper.mealsServed} />
					</Box>
					{prepper.isKitchenClosed && (
						<Box
							position={'relative'}
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							alignItems={'center'}
							width={'100%'}
							height={'20rem'}
							mt={5}
						>
							<Image
								src={'/images/myKitchen/redClosed.jpg'}
								style={{ objectFit: 'cover' }}
								fill
								alt="Store closed image"
								sizes="100%"
							/>
						</Box>
					)}
				</Box>
			</Box>
			<Divider
				sx={{ my: '2rem', backgroundColor: colors.orangeAccent[900] }}
				flexItem
				variant="middle"
			/>
			<Typography fontSize={{ xs: '2rem', lg: '4rem' }} variant="h2">
				Meals
			</Typography>
			{!prepper.meals.length && (
				<Box width="50%">
					<Alert color="error" fontSize="large">
						<Typography variant="h3">
							Meals are currently unavailbale. Check back soon
						</Typography>
					</Alert>
				</Box>
			)}
			{prepper.meals.length && meals.length !== 0 ? (
				<Box
					display={'flex'}
					flexWrap={'wrap'}
					height="100%"
					justifyContent={'center'}
					alignItems={'center'}
					width={'100%'}
					gap={5}
					py={5}
				>
					{meals.map(({ price, image, description, title, id, qty = 1 }) => {
						return (
							<Box key={id}>
								<FoodItemCard
									key={title}
									foodItem={title}
									image={image}
									price={price}
									description={description}
									id={id}
									qty={qty}
									setMsg={setMsg}
									prepperEmail={prepper.email}
									kitchen={prepper.kitchenTitle}
									isKitchenClosed={prepper.isKitchenClosed}
									isOnPrepperPage={true}
									prepperId={prepperId}
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
