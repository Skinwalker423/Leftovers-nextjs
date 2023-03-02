import React, { useState } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Box, Typography, Alert, Divider, Paper, Button } from '@mui/material';
import Image from 'next/image';
import SuccessAlert from '../components/UI/alert/successAlert';
import ResponsiveDrawer from '../components/layout/sidebar/myKitchenSidebar';
import AddMeal from '../components/UI/form/mykitchen/addMeal';
import DefaultAvatar from '../components/UI/icon/defaultAvatar';
import InfoCard from '../components/myKitchen/infoCard';
import MyKitchenMealCard from '../components/Card/myKitchenMeals';
import {
	connectMongoDb,
	findExistingPrepperEmail,
} from '../db/mongodb/mongoDbUtils';

export async function getServerSideProps({ req, res }) {
	const session = await unstable_getServerSession(req, res, authOptions);

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
	console.log(prepper.meals);
	const [msg, setMsg] = useState('');
	const { name = 'User', email, image } = userData;
	const [showMeals, setShowMeals] = useState(false);

	const handleRemoveMealBtn = () => {
		setShowMeals((bool) => !bool);
	};

	const mealsList = prepper.meals.map(({ title, id, description }) => {
		return (
			<Box key={id}>
				<MyKitchenMealCard
					key={id}
					foodItem={title}
					description={description}
				/>
			</Box>
		);
	});

	return (
		<Box
			width='100%'
			// height={'90%'}
			display={'flex'}
			flexDirection={{ xs: 'column', lg: 'row' }}
			justifyContent='center'
			alignItems={'center'}>
			<ResponsiveDrawer />
			<Box width={{ xs: '70%', lg: '80%' }} mt={'6em'}>
				<InfoCard>
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
				<InfoCard>
					<Typography variant='h1'>
						{prepper ? prepper?.kitchenTitle : ''}
					</Typography>
					<Button color='warning' variant='contained'>
						Edit Kitchen Name
					</Button>
				</InfoCard>
				<InfoCard>
					<Typography variant='h3'>
						{prepper ? prepper?.description : ''}
					</Typography>
					<Button color='warning' variant='contained'>
						Edit description
					</Button>
				</InfoCard>
				<InfoCard>
					<Typography>Add a meal to your Kitchen</Typography>
					<AddMeal setMsg={setMsg} email={prepper.email} />
				</InfoCard>
				<InfoCard>
					<Typography>Remove a meal</Typography>
					<Button
						onClick={handleRemoveMealBtn}
						color='error'
						variant='contained'>
						Remove meal
					</Button>
				</InfoCard>
				{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
				{showMeals && (
					<Box mt={'2em'} gap='2em' display={'flex'} flexWrap='wrap'>
						{mealsList}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default myKitchen;
