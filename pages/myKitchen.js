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
	const [msg, setMsg] = useState('');
	const { name = 'User', email, image } = userData;
	return (
		<Box
			width='100%'
			// height={'90%'}
			display={'flex'}
			flexDirection={{ xs: 'column', lg: 'row' }}
			justifyContent='center'
			alignItems={'flex-start'}>
			<Box width='80%' mt={'6em'}>
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
					<Button color='error' variant='contained'>
						Edit image
					</Button>
				</InfoCard>
				<InfoCard>
					<Typography variant='h1'>
						{prepper ? prepper?.kitchenTitle : ''}
					</Typography>
					<Button color='error' variant='contained'>
						Edit Kitchen Name
					</Button>
				</InfoCard>
				<InfoCard>
					<Typography variant='h2'>{email}</Typography>
					<Button color='error' variant='contained'>
						Edit Email
					</Button>
				</InfoCard>
				<InfoCard>
					<Typography variant='h3'>
						{prepper ? prepper?.description : ''}
					</Typography>
					<Button color='error' variant='contained'>
						Edit description
					</Button>
				</InfoCard>
				<InfoCard>
					<Typography variant='h3'>{prepper ? prepper?.name : name}</Typography>
					<Button color='error' variant='contained'>
						Edit name
					</Button>
				</InfoCard>
				<InfoCard>
					<Box>
						<Typography variant='h3'>
							state: {prepper.location ? prepper?.location?.state : ''}
						</Typography>
						<Typography variant='h3'>
							zipcode: {prepper.location ? prepper?.location?.zipcode : ''}
						</Typography>
					</Box>
					<Button color='error' variant='contained'>
						Edit Email
					</Button>
				</InfoCard>
				<InfoCard>
					<Typography>Add a meal to your Kitchen</Typography>
					<AddMeal setMsg={setMsg} email={prepper.email} />
				</InfoCard>
				<InfoCard>
					<Typography>Remove a meal</Typography>
					<Button color='error' variant='contained'>
						Remove meal
					</Button>
				</InfoCard>
				{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
			</Box>
		</Box>
	);
};

export default myKitchen;
