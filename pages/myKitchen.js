import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import SuccessAlert from '../components/UI/alert/successAlert';
import ErrorAlert from '../components/UI/alert/ErrorAlert';
import ResponsiveDrawer from '../components/layout/sidebar/myKitchenSidebar';
import AddMeal from '../components/UI/form/mykitchen/addMeal';
import DefaultAvatar from '../components/UI/icon/defaultAvatar';
import InfoCard from '../components/myKitchen/infoCard';
import Head from 'next/head';
import UpdateKitchenForm from '../components/UI/form/mykitchen/updateKitchenTitleForm';

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

	console.log(session.user);
	const user = {
		name: session.user?.name || null,
		image: session.user?.image || null,
		email: session.user?.email || null,
	};

	return {
		props: {
			userData: user,
			prepper: userDb,
		},
	};
}

const myKitchen = ({ userData, prepper }) => {
	const [msg, setMsg] = useState('');
	const [error, setError] = useState('');
	const { email, image } = userData;
	const [showMeals, setShowMeals] = useState(true);
	const [meals, setMeals] = useState(prepper.meals);
	const [selected, setSelected] = useState('');

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
			<ResponsiveDrawer selected={selected} setSelected={setSelected} />
			{selected === 'Kitchen profile' && (
				<Box
					display='flex'
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					mx={'1rem'}
					width={{ xs: '75%', sm: '60%', md: '80%' }}
					mt={'6em'}>
					<InfoCard title='Avatar'>
						{image ? (
							<Image
								alt={`avatar image of ${prepper.name}`}
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
						<Button color='warning' variant='outlined'>
							Edit image
						</Button>
					</InfoCard>
					<InfoCard title='Kitchen Picture'>
						<Typography>Picture here</Typography>
						<Button color='warning' variant='outlined'>
							Edit Picture
						</Button>
					</InfoCard>

					<InfoCard title='Kitchen Name'>
						<Typography>{prepper.kitchenTitle}</Typography>
						<UpdateKitchenForm
							email={prepper.email}
							oldKitchenTitle={prepper.kitchenTitle}
							setMsg={setMsg}
						/>
					</InfoCard>
					<InfoCard title='Description'>
						<Typography>{prepper.description}</Typography>
						<UpdateKitchenForm
							email={prepper.email}
							oldDescription={prepper.description}
							setMsg={setMsg}
						/>
					</InfoCard>
				</Box>
			)}
			{selected === 'My Meals' && (
				<Box mx={'1rem'} width={{ xs: '75%', sm: '60%', md: '80%' }} mt={'6em'}>
					<InfoCard title='Add Meal'>
						<Typography>Add a meal to your Kitchen</Typography>
						<AddMeal
							setMsg={setMsg}
							email={prepper.email}
							setMeals={setMeals}
						/>
					</InfoCard>
					<InfoCard title='Remove/Edit Meals'>
						<Typography>
							Use this to adjust meal status such as sold out, quantity, and
							remove a meal
						</Typography>
						<Button
							onClick={handleShowMealBtn}
							color='error'
							variant='outlined'>
							{showMeals ? 'Hide meals' : 'Update Meals'}
						</Button>
					</InfoCard>
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
			)}
			{msg && <SuccessAlert width='80%' msg={msg} setMsg={setMsg} />}
			{error && <ErrorAlert width='80%' error={error} setError={setError} />}
		</Box>
	);
};

export default myKitchen;
