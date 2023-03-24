import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import SuccessAlert from '../components/UI/alert/successAlert';
import ErrorAlert from '../components/UI/alert/ErrorAlert';
import ResponsiveDrawer from '../components/layout/sidebar/myKitchenSidebar';
import AddMeal from '../components/UI/form/mykitchen/addMeal';
import DefaultAvatar from '../components/UI/icon/defaultAvatar';
import InfoCard from '../components/myKitchen/infoCard';
import Head from 'next/head';
import UpdateKitchenTitleForm from '../components/UI/form/mykitchen/updateKitchenTitleForm';

import {
	connectMongoDb,
	findExistingPrepperEmail,
} from '../db/mongodb/mongoDbUtils';
import MealsList from '../components/myKitchen/mealsList';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	const client = await connectMongoDb();
	const userDb = await findExistingPrepperEmail(client, session.user.email);

	if (!userDb) {
		return {
			redirect: {
				destination: '/register',
				permanent: false,
			},
		};
	}

	return {
		props: {
			userData: session.user,
			prepper: userDb,
		},
	};
}

const myKitchen = ({ userData, prepper }) => {
	const [msg, setMsg] = useState('');
	const [error, setError] = useState('');
	const { name = 'User', email, image } = userData;
	const [showMeals, setShowMeals] = useState(false);
	const [meals, setMeals] = useState(prepper.meals);

	const handleShowMealBtn = () => {
		setShowMeals((bool) => !bool);
	};

	return (
		<Box
			width='100%'
			height={'100%'}
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			justifyContent={{ xs: 'flex-start' }}
			alignItems={'center'}>
			<Head>
				<title>MyKitchen</title>
				<meta
					name='description'
					content='Manage the contents of your kitchen by adding/removing/updating pictures, avatar, kitchen name, description, meals and their quanities'
				/>
			</Head>
			<ResponsiveDrawer />
			<Box mx={'1rem'} width={{ xs: '70%', sm: '60%', md: '40%' }} mt={'6em'}>
				<InfoCard title='Avatar'>
					{image ? (
						<Image
							alt={`avatar image of ${name}`}
							src={image}
							width={100}
							height={100}
							priority
						/>
					) : (
						<DefaultAvatar
							userEmail={prepper.name}
							widthHeight={100}
							fontSize='3em'
						/>
					)}
					<Button color='warning' variant='contained'>
						Edit image
					</Button>
				</InfoCard>
				<InfoCard title='Kitchen Picture'>
					<Typography>Picture here</Typography>
					<Button color='warning' variant='contained'>
						Edit Kitchen Picture
					</Button>
				</InfoCard>
				<InfoCard title='Add Meal'>
					<Typography>Add a meal to your Kitchen</Typography>
					<AddMeal setMsg={setMsg} email={prepper.email} setMeals={setMeals} />
				</InfoCard>
				<InfoCard title='Remove/Edit Meals'>
					<Typography>
						Use this to adjust meal status such as sold out, quantity, and
						remove a meal
					</Typography>
					<Button onClick={handleShowMealBtn} color='error' variant='contained'>
						{showMeals ? 'Hide meals' : 'Update Meals'}
					</Button>
				</InfoCard>
				<InfoCard title='Kitchen Name'>
					<Typography variant='h1'>{prepper.kitchenTitle}</Typography>
					<UpdateKitchenTitleForm
						email={prepper.email}
						oldKitchenTitle={prepper.kitchenTitle}
						setMsg={setMsg}
					/>
				</InfoCard>
				<InfoCard title='Description'>
					<Typography variant='h3'>{prepper.description}</Typography>
					<Button color='warning' variant='contained'>
						Edit description
					</Button>
				</InfoCard>

				{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
				{error && <ErrorAlert error={error} setError={setError} />}
			</Box>
			{showMeals && (
				<MealsList
					meals={meals}
					prepperEmail={prepper.email}
					setMeals={setMeals}
					setMsg={setMsg}
					setError={setError}
				/>
			)}
		</Box>
	);
};

export default myKitchen;
