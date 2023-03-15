import * as React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	Box,
	Typography,
	Stack,
	IconButton,
	CardActions,
	CardContent,
	CardMedia,
	Tooltip,
	Button,
	Card,
} from '@mui/material';
import { UserContext } from '../../store/UserContext';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';

export default function FoodItemCard({
	foodItem = 'Food Item',
	description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
	image = '/art.jpg',
	price,
	id,
	qty = 1,
	setMsg,
}) {
	const [favorited, setFavorited] = useState(false);
	const { incrementFoodItem } = useContext(UserContext);

	const meal = {
		id,
		price,
		image,
		description,
		foodItem,
		qty,
	};

	const handleFavorite = () => {
		setFavorited((bool) => !bool);
	};

	const handleAddCartItem = () => {
		incrementFoodItem(meal);
		setMsg(`Added ${foodItem} to your meal cart`);
		setTimeout(() => {
			setMsg('');
		}, 5000);
	};

	return (
		<motion.div whileHover={{ scale: 1.1 }}>
			<Card sx={{ maxWidth: 345, height: '300px' }}>
				<CardMedia sx={{ height: '50%' }} image={image} title={foodItem} />
				<Stack sx={{ height: '50%' }} justifyContent='space-between'>
					<CardContent>
						<Box display='flex' justifyContent={'space-between'}>
							<Typography
								color={'secondary'}
								gutterBottom
								variant='h5'
								component='div'>
								{foodItem}
							</Typography>

							<Typography gutterBottom variant='h5' component='div'>
								${price}
							</Typography>
						</Box>
						<Typography variant='body2'>{description}</Typography>
					</CardContent>
					<CardActions
						sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Tooltip title='Like this meal'>
							<IconButton onClick={handleFavorite} size='small'>
								{favorited ? (
									<FavoriteIcon color='error' />
								) : (
									<FavoriteBorderOutlinedIcon />
								)}
							</IconButton>
						</Tooltip>
						<Button
							variant='contained'
							color='success'
							onClick={handleAddCartItem}
							size='small'>
							Add to Cart
						</Button>
					</CardActions>
				</Stack>
			</Card>
		</motion.div>
	);
}
