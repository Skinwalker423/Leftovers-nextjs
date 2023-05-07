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
	kitchen
}) {
	const [favorited, setFavorited] = useState(false);
	const [loading, setLoading] = useState(false);
	const { incrementFoodItem } = useContext(UserContext);
	const { colors } = useColors();

	const defaultMealImg =
		image === '' ? '/images/cooking/defaultMeal.jpg' : image;

	const meal = {
		id,
		price,
		image: defaultMealImg,
		description,
		foodItem,
		qty,
		prepperEmail
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
		<motion.div whileHover={{ scale: 1.1 }}>
			<Card
				sx={{
					maxWidth: 375,
					height: '24rem',
					minWidth: 325,
					m: '2rem',
					backgroundColor: colors.primary[400]
				}}
			>
				<CardMedia
					sx={{ height: '45%' }}
					image={defaultMealImg}
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
						<Box>
							<Box display="flex" justifyContent={'space-between'}>
								<Typography
									color={'secondary'}
									gutterBottom
									variant="h4"
									component="div"
								>
									{foodItem}
								</Typography>

								<Typography gutterBottom variant="h5" component="div">
									${price}
								</Typography>
							</Box>
							<Box>
								<Typography variant="body2">{description}</Typography>
							</Box>
							<Typography>{kitchen}</Typography>
						</Box>
						<Box>
							{qty == 0 ? (
								<Alert variant="outlined" color="error">
									OUT OF STOCK
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
						sx={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<Tooltip title="Like this meal">
							<IconButton onClick={handleFavorite} size="small">
								{favorited ? (
									<FavoriteIcon color="error" />
								) : (
									<FavoriteBorderOutlinedIcon />
								)}
							</IconButton>
						</Tooltip>
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
						<Button
							variant="contained"
							color="success"
							disabled={qty == 0}
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
