import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Box, Typography, Button } from '@mui/material';
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
	const { name = 'User', email, image } = userData;
	const [showMeals, setShowMeals] = useState(false);
	const [meals, setMeals] = useState(prepper.meals);

	const handleShowMealBtn = () => {
		setShowMeals((bool) => !bool);
	};

	const mealsList = meals.map(({ title, id, description }) => {
		return (
			<Box key={id} mb='2em'>
				<MyKitchenMealCard
					key={id}
					foodItem={title}
					description={description}
					setMsg={setMsg}
					prepperEmail={prepper.email}
					id={id}
					setMeals={setMeals}
				/>
			</Box>
		);
	});

	return (
		<Box
			width='100%'
			height={'100%'}
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			justifyContent={{ xs: 'flex-start' }}
			alignItems={'center'}>
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
				<InfoCard title='Kitchen Name'>
					<Typography variant='h1'>
						{prepper ? prepper?.kitchenTitle : ''}
					</Typography>
					<Button color='warning' variant='contained'>
						Edit Kitchen Name
					</Button>
				</InfoCard>
				<InfoCard title='Descrption'>
					<Typography variant='h3'>
						{prepper ? prepper?.description : ''}
					</Typography>
					<Button color='warning' variant='contained'>
						Edit description
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
				{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
			</Box>
			{showMeals && (
				<AnimatePresence>
					<motion.div
						key={'meals'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ type: 'spring', delay: 0.2 }}
						exit={{ opacity: 0 }}>
						<Box
							width={'100%'}
							mt={'2em'}
							gap='2em'
							display={'flex'}
							alignItems='center'
							justifyContent={'center'}
							flexWrap='wrap'>
							{mealsList}
						</Box>
					</motion.div>
				</AnimatePresence>
			)}
		</Box>
	);
};

export default myKitchen;
