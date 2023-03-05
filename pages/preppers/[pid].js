import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Paper, IconButton, Alert } from '@mui/material';
import CustomLoader from '../../components/UI/Loader';
import { fetchPrepper } from '../../utils/fetchPrepper';
import FoodItemCard from '../../components/Card/foodItemCard';
import Head from 'next/head';
import Image from 'next/image';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SuccessAlert from '../../components/UI/alert/successAlert';

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
	const [meals, setMeals] = useState([]);
	const [msg, setMsg] = useState('');

	useEffect(() => {
		if (prepper.meals) {
			setMeals(prepper.meals);
		}
	}, [meals]);

	const prepperId = router.query.pid;
	if (!prepperId) {
		return (
			<Box
				width='100%'
				height='100vh'
				display='flex'
				justifyContent='center'
				alignItems='center'>
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
				m='100px 0'
				display='flex'
				flexDirection={'column'}
				width='100%'
				justifyContent='center'
				alignItems='center'>
				<Paper
					sx={{
						width: '70%',
						height: '50vh',
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
							<Box display={'flex'} alignItems='center'>
								<IconButton>
									<WorkspacePremiumIcon color='error' fontSize='large' />
								</IconButton>
								<Typography fontSize={'large'}>42</Typography>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>
			{meals.length !== 0 ? (
				<Box display={'flex'} width='70%'>
					{meals.map(({ price, image, description, title, id }) => {
						return (
							<Box key={id} width='100%' height={'500px'}>
								<FoodItemCard
									key={title}
									foodItem={title}
									image={image === '' ? '/art.jpg' : image}
									price={price}
									description={description}
									id={id}
									qty={1}
									setMsg={setMsg}
								/>
							</Box>
						);
					})}
				</Box>
			) : (
				<Box width='50%'>
					<Alert color='error' fontSize='large'>
						<Typography variant='h3'>
							Meals are currently unavailbale. Check back soon
						</Typography>
					</Alert>
				</Box>
			)}
			{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
		</Box>
	);
};

export default Prepper;
