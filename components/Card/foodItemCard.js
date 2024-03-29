import * as React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	Box,
	Typography,
	CircularProgress,
	Stack,
	IconButton,
	CardActions,
	CardContent,
	CardMedia,
	Tooltip,
	Button,
	Alert,
	Card
} from '@mui/material';
import { UserContext } from '../../store/UserContext';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useColors } from '../../hooks/useColors';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function FoodItemCard({
	foodItem = 'Food Item',
	description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
	image,
	price,
	id,
	qty = 1,
	setMsg,
	prepperEmail,
	prepperId,
	kitchen,
	isKitchenClosed,
	showClosed,
	isOnPrepperPage
}) {
	const [favorited, setFavorited] = useState(false);
	const [loading, setLoading] = useState(false);
	const { incrementFoodItem, state } = useContext(UserContext);
	const { colors } = useColors();

	const { data: session } = useSession();

	const defaultMealImg = image ? image : '/images/cooking/defaultMeal.jpg';
	const currentCartItemsPrepper = state?.userCartlist[0]?.prepperEmail;

	const isItemFromDifferentPrepper =
		state.userCartlist.length > 0 && currentCartItemsPrepper !== prepperEmail;

	const devMealImg =
		process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true'
			? '/images/cooking/defaultMeal.jpg'
			: defaultMealImg;

	const meal = {
		id,
		price,
		image: defaultMealImg,
		description,
		foodItem,
		qty,
		prepperEmail,
		prepperId,
		kitchen
	};

	const handleFavorite = () => {
		setFavorited((bool) => !bool);
	};

	const handleAddCartItem = () => {
		incrementFoodItem(meal);
		setMsg(`Added ${foodItem} to your meal cart`);
		setTimeout(() => {
			setMsg('');
		}, 3000);
	};

	const handleViewKitchenClick = () => {
		setLoading(true);
	};

	return (
		<motion.div whileHover={{ scale: 1.02 }}>
			<Card
				sx={{
					width: { xs: '20rem', lg: '23rem' },
					height: '25rem',
					mx: '.5rem',
					backgroundColor: colors.primary[400]
				}}
			>
				<CardMedia
					sx={{ height: '40%', width: 'auto' }}
					image={devMealImg}
					title={foodItem}
				/>
				<Stack sx={{ height: '55%' }} justifyContent="space-between">
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							height: '100%'
						}}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'space-between'}
						>
							<Box display="flex" justifyContent={'space-between'}>
								<Typography
									color={'secondary'}
									gutterBottom
									variant="h4"
									component="div"
								>
									{foodItem}
								</Typography>

								<Typography
									color={'secondary'}
									gutterBottom
									variant="h4"
									component="div"
								>
									${price}
								</Typography>
							</Box>
							<Box>
								<Typography fontSize={'small'} variant="body2">
									{description}
								</Typography>
							</Box>
							{!isOnPrepperPage && (
								<Box>
									<Link
										style={{ textDecoration: 'none' }}
										href={`/preppers/${prepperId}`}
										prefetch={false}
									>
										<Typography
											sx={{
												':hover': {
													color: colors.blueAccent[300]
												}
											}}
											color={colors.blueAccent[400]}
										>
											{kitchen}
										</Typography>
									</Link>
								</Box>
							)}
						</Box>
						<Box mt={'.5em'}>
							{qty == 0 || isItemFromDifferentPrepper ? (
								<Alert variant="outlined" color="error">
									{isItemFromDifferentPrepper
										? 'Order must be from the same kitchen'
										: 'OUT OF STOCK'}
								</Alert>
							) : (
								<Alert
									variant="outlined"
									color={qty > 3 ? 'success' : 'warning'}
								>
									{`${qty > 3 ? '' : 'Only'} ${qty} left`}
								</Alert>
							)}
						</Box>
					</CardContent>
					<CardActions
						sx={{
							display: 'flex',
							justifyContent: session ? 'space-between' : 'flex-end',
							pb: '.5em'
						}}
					>
						{session && (
							<Tooltip title="Like this meal">
								<IconButton onClick={handleFavorite} size="small">
									{favorited ? (
										<FavoriteIcon color="error" />
									) : (
										<FavoriteBorderOutlinedIcon />
									)}
								</IconButton>
							</Tooltip>
						)}
						{prepperId && (
							<Link
								style={{ textDecoration: 'none' }}
								href={`/preppers/${prepperId}`}
							>
								<Button
									variant="outlined"
									onClick={handleViewKitchenClick}
									color={'secondary'}
									disabled={qty == 0 || loading}
									size="small"
								>
									<Typography
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
										sx={{ width: '6rem', height: '1.5rem' }}
									>
										{loading ? (
											<CircularProgress size={'1rem'} />
										) : (
											'Visit Kitchen'
										)}
									</Typography>
								</Button>
							</Link>
						)}

						{isKitchenClosed && showClosed && (
							<Image
								src={'/images/myKitchen/redClosed.jpg'}
								width={50}
								height={30}
								alt="closed sign"
							/>
						)}

						<Button
							variant="contained"
							color="success"
							disabled={
								qty == 0 || isItemFromDifferentPrepper || isKitchenClosed
							}
							onClick={handleAddCartItem}
							size="small"
						>
							Add to Cart
						</Button>
					</CardActions>
				</Stack>
			</Card>
		</motion.div>
	);
}
