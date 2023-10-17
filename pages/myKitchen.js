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
import { findAllOrdersByPrepperEmail } from '../db/mongodb/mongoDbUtils';
import {
	connectMongoDb,
	findExistingPrepperEmail
} from '../db/mongodb/mongoDbUtils';
import MealsList from '../components/myKitchen/mealsList';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import OrdersList from '../components/myKitchen/orders/ordersList';
import { useColors } from '../hooks/useColors';
import MyKitchenHeader from '../components/myKitchen/myKitchenHeader';
import '@uploadthing/react/styles.css';
import { UploadButton } from '../utils/uploadthing';
import { updateKitchenImageDb } from '../utils/myKitchen/updateKitchenImage';
import UpdateKitchenImage from '../components/UI/form/mykitchen/updateKitchenImage';
import MyKitchenBottomBar from '../components/layout/bottombar/myKitchenBottomBar';
import ProfileSavedImagesForm from '../components/UI/form/mykitchen/profileSavedImages';
import { updateProfileImageDb } from '../utils/myKitchen/updateProfileImageDB';
import CircleIcon from '@mui/icons-material/Circle';
import { fetchKitchenOpenStatusDb } from '../utils/myKitchen/fetchKitchenOpenStatus';

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false
			}
		};
	}

	const client = await connectMongoDb();
	const userDb = await findExistingPrepperEmail(client, session.user.email);
	const orders = await findAllOrdersByPrepperEmail(
		client,
		session?.user?.email
	);

	if (!userDb) {
		return {
			redirect: {
				destination: '/register',
				permanent: false
			}
		};
	}

	const user = {
		name: session.user?.name || null,
		image: session.user?.image || null,
		email: session.user?.email || null
	};

	return {
		props: {
			userData: user,
			prepper: JSON.parse(JSON.stringify(userDb)),
			orders: orders.length > 0 ? orders : []
		}
	};
}

const myKitchen = ({ userData, prepper, orders }) => {
	const devAvatar =
		process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true'
			? '/art.jpg'
			: prepper.kitchenImgUrl;

	const [msg, setMsg] = useState('');
	const [error, setError] = useState('');
	const { email, image } = userData;
	const [showMeals, setShowMeals] = useState(true);
	const [meals, setMeals] = useState(prepper.meals);
	const [selected, setSelected] = useState('Kitchen profile');
	const [myOrders, setMyOrders] = useState(orders);
	const [kitchenImage, setKitchenImage] = useState(prepper.kitchenImgUrl);
	const [profileImage, setProfileImage] = useState(prepper.profileImgUrl);
	const [savedMealImages, setSavedMealImages] = useState(
		prepper.savedMealImages
	);
	const [savedAvatarImages, setSavedAvatarImages] = useState(
		prepper.savedProfileImages
	);
	const [selectedImg, setSelectedImg] = useState(profileImage);
	const [kitchenClosed, setKitchenClosed] = useState(prepper.isKitchenClosed);

	const { colors } = useColors();
	const theme = useTheme();
	const xSmall = useMediaQuery(theme.breakpoints.down('sm'));

	const currentUserEmail = userData?.email;

	const handleShowMealBtn = () => {
		setShowMeals((bool) => !bool);
	};

	const handleKitchenOpenStatus = async () => {
		const currentStatus = kitchenClosed ? false : true;
		try {
			const res = await fetchKitchenOpenStatusDb(
				currentUserEmail,
				currentStatus
			);
			if (res.error) {
				console.log('kitchen status updated', res.message);
				setError(res.error);
				return;
			}
			if (res.message) {
				setMsg(res.message);
				console.log('kitchen status updated', res.message);
				setKitchenClosed((prevStatus) => !prevStatus);
			}
		} catch (error) {
			setError(error);
		}
	};

	return (
		<Box
			width="100%"
			height={'100%'}
			display={'flex'}
			position={'relative'}
			flexDirection={{ xs: 'column', md: 'row' }}
			justifyContent={{ xs: 'flex-start' }}
			alignItems={'center'}
			sx={{
				backgroundImage: `url('/kitchen2.jpg')`,
				backgroundSize: 'cover'
			}}
		>
			<Head>
				<title>MyKitchen</title>
				<meta
					name="description"
					content="Manage the contents of your kitchen by adding/removing/updating pictures, avatar, kitchen name, description, meals and their quanities"
				/>
			</Head>

			{xSmall ? (
				<MyKitchenBottomBar selected={selected} setSelected={setSelected} />
			) : (
				<ResponsiveDrawer selected={selected} setSelected={setSelected} />
			)}
			{selected === 'Kitchen profile' && (
				<Box
					display="flex"
					flexDirection={'column'}
					justifyContent={'flex-start'}
					alignItems={'center'}
					minHeight={'100vh'}
					ml={{ xs: 0, sm: '1.5rem' }}
					mb={{ xs: '7em', sm: 0 }}
					width={{ xs: '90%', sm: '60%', md: '80%' }}
				>
					<MyKitchenHeader title={'Kitchen Profile'} />
					<InfoCard title="Kitchen Picture">
						<Box
							display={'flex'}
							alignItems={'center'}
							flexDirection={{ xs: 'column', md: 'row' }}
							justifyContent={'space-between'}
							width={'100%'}
						>
							<Box
								position={'relative'}
								width={{ xs: '100%', md: 150 }}
								height={{ xs: 200, md: 150 }}
							>
								<Image
									fill
									style={{ objectFit: 'cover' }}
									src={kitchenImage || '/kitchen2.jpg'}
									alt={`The kitchen of ${prepper.kitchenTitle}`}
									priority
									sizes={{ width: '150px', height: '150px' }}
								/>
							</Box>
							<Box
								display={'flex'}
								justifyContent={'flex-end'}
								alignItems={'center'}
								width={'70%'}
								flexDirection={{ xs: 'column', md: 'row' }}
								gap={1}
								mt={{ xs: 2, md: 0 }}
							>
								<UpdateKitchenImage
									email={prepper.email}
									setMsg={setMsg}
									currentImg={kitchenImage}
									savedImages={prepper.savedKitchenImages}
									setKitchenImage={setKitchenImage}
								/>
								<Typography>Or</Typography>
								<UploadButton
									endpoint="imageUploader"
									onClientUploadComplete={async (res) => {
										// Do something with the response
										const imgUrl = res[0].url;
										setKitchenImage(imgUrl);
										try {
											const data = await updateKitchenImageDb(
												prepper.email,
												imgUrl,
												'add'
											);
											if (data.message) {
												setMsg(data.message);
											}
										} catch (err) {
											console.error('problem updating kitchen image', err);

											setError(err);
										}
										setTimeout(() => {
											setMsg('');
											setError('');
										}, 3000);
									}}
									onUploadError={(error) => {
										// Do something with the error.
										alert(`ERROR! ${error.message}`);
									}}
								/>
							</Box>
						</Box>
					</InfoCard>

					<InfoCard title="Kitchen open/closed for meal orders">
						<Typography
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								color: kitchenClosed
									? colors.redAccent[400]
									: colors.greenAccent[400]
							}}
							variant="h4"
						>
							<CircleIcon
								sx={{
									color: kitchenClosed
										? colors.redAccent[400]
										: colors.greenAccent[400]
								}}
							/>{' '}
							{kitchenClosed ? 'Currently Closed' : 'Currently Open'}
						</Typography>
						<Button
							type="button"
							color={kitchenClosed ? 'success' : 'error'}
							variant="contained"
							onClick={handleKitchenOpenStatus}
						>
							{kitchenClosed ? 'Open Kicthen' : 'Close for orders'}
						</Button>
					</InfoCard>
					<InfoCard title="Kitchen Name">
						<Typography variant="h4">{prepper.kitchenTitle}</Typography>
						<UpdateKitchenForm
							email={prepper.email}
							oldKitchenTitle={prepper.kitchenTitle}
							setMsg={setMsg}
						/>
					</InfoCard>
					<InfoCard title="Description">
						<Typography variant="h4">{prepper.description}</Typography>
						<UpdateKitchenForm
							email={prepper.email}
							oldDescription={prepper.description}
							setMsg={setMsg}
						/>
					</InfoCard>
				</Box>
			)}
			{selected === 'My Meals' && (
				<Box
					display="flex"
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					mx={'1rem'}
					width={{ xs: '75%', sm: '60%', md: '80%' }}
					minHeight={'100vh'}
					mb={{ xs: '7em', sm: 0 }}
				>
					<MyKitchenHeader title={'My Meals'} />
					<InfoCard title="Add Meal">
						<Typography variant="h4">Add a meal to your Kitchen</Typography>
						<AddMeal
							setMsg={setMsg}
							email={prepper.email}
							setMeals={setMeals}
							setSavedMealImages={setSavedMealImages}
						/>
					</InfoCard>
					<InfoCard title="Remove/Edit Meals">
						<Typography variant="h4">
							Use this to adjust meal details such as if it's sold out, quantity
							on hand, meal image, and remove a meal
						</Typography>
						<Button
							onClick={handleShowMealBtn}
							color="error"
							variant="outlined"
						>
							{showMeals ? 'Hide meals' : 'Update Meals'}
						</Button>
					</InfoCard>
					{showMeals && (
						<MealsList
							meals={meals}
							prepperEmail={prepper.email}
							savedMealImages={savedMealImages}
							setSavedMealImages={setSavedMealImages}
							setMeals={setMeals}
							setMsg={setMsg}
							setError={setError}
						/>
					)}
				</Box>
			)}
			{selected === 'Personal Info' && (
				<Box
					display="flex"
					flexDirection={'column'}
					justifyContent={'flex-start'}
					alignItems={'center'}
					mx={'1rem'}
					width={{ xs: '75%', sm: '60%', md: '80%' }}
					minHeight={'100vh'}
					mb={{ xs: '7em', sm: 0 }}
				>
					<MyKitchenHeader title={'Personal Info'} />
					<InfoCard title="Avatar">
						{profileImage || image ? (
							<Image
								alt={`avatar image of ${prepper.name}`}
								src={profileImage || image}
								width={100}
								height={100}
								priority
							/>
						) : (
							<DefaultAvatar
								userEmail={prepper.name}
								widthHeight={100}
								fontSize="3em"
							/>
						)}
						<Box
							display={'flex'}
							justifyContent={'flex-end'}
							alignItems={'center'}
							width={'70%'}
							flexDirection={{ xs: 'column', md: 'row' }}
							gap={1}
							mt={{ xs: 2, md: 0 }}
						>
							<ProfileSavedImagesForm
								email={prepper.email}
								setMsg={setMsg}
								currentImg={profileImage}
								savedImages={savedAvatarImages}
								setProfileImage={setProfileImage}
								selectedImg={selectedImg}
								setSelectedImg={setSelectedImg}
							/>
							<Typography>Or</Typography>
							<UploadButton
								endpoint="imageUploader"
								onClientUploadComplete={async (res) => {
									// Do something with the response
									const imgUrl = res[0].url;
									setProfileImage(imgUrl);
									setSelectedImg(imgUrl);
									if (!savedAvatarImages.includes(imgUrl)) {
										setSavedAvatarImages((prevList) => [...prevList, imgUrl]);
									}
									try {
										const data = await updateProfileImageDb(
											prepper.email,
											imgUrl,
											'add'
										);
										if (data.message) {
											setMsg(data.message);
										}
									} catch (err) {
										console.error('problem updating profile image', err);

										setError(err);
									}
									setTimeout(() => {
										setMsg('');
										setError('');
									}, 3000);
								}}
								onUploadError={(error) => {
									// Do something with the error.
									alert(`ERROR! ${error.message}`);
								}}
							/>
						</Box>
					</InfoCard>
					<InfoCard title="Email">
						<Typography variant="h4">{prepper.email}</Typography>
					</InfoCard>
					<InfoCard title="Name">
						<Typography variant="h4">{prepper.name}</Typography>
					</InfoCard>
					<InfoCard title="Home Address">
						<Stack>
							<Typography variant="h4">{prepper.location.address}</Typography>
							<Typography variant="h4">
								{prepper.location.city}, {prepper.location.state},{' '}
								{prepper.location.zipcode}
							</Typography>
						</Stack>
					</InfoCard>
				</Box>
			)}
			{selected === 'Orders' && (
				<Box
					width={'100%'}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					minHeight={'100vh'}
					mb={{ xs: '7em', sm: 0 }}
				>
					<MyKitchenHeader title={'Orders'} />
					<OrdersList
						myOrders={myOrders}
						currentUserEmail={currentUserEmail}
						setMsg={setMsg}
					/>
				</Box>
			)}

			{msg && <SuccessAlert msg={msg} setMsg={setMsg} />}
			{error && <ErrorAlert error={error} setError={setError} />}
		</Box>
	);
};

export default myKitchen;
