import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { Box, Typography, Stack } from '@mui/material';
import { UserContext } from '../../store/UserContext';
import { useContext, useState } from 'react';
import { ACTION_TYPES } from '../../store/UserContext';

export default function FoodItemCard({
	foodItem = 'Food Item',
	description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
	image = '/art.jpg',
	price,
	id,
	qty,
}) {
	const [favorited, setFavorited] = useState(false);
	const { state, dispatch, incrementFoodItem, calculateTotalPrice } =
		useContext(UserContext);

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
		console.log(`favorited ${foodItem}`);
	};

	const handleAddCartItem = () => {
		incrementFoodItem(meal);
		calculateTotalPrice();
	};

	return (
		<Card sx={{ maxWidth: 345, height: '300px' }}>
			<CardMedia sx={{ height: '50%' }} image={image} title='green iguana' />
			<Stack sx={{ height: '50%' }} justifyContent='space-between'>
				<CardContent>
					<Box display='flex' justifyContent={'space-between'}>
						<Typography
							color={'green'}
							gutterBottom
							variant='h5'
							component='div'>
							{foodItem}
						</Typography>

						<Typography gutterBottom variant='h5' component='div'>
							${price}
						</Typography>
					</Box>
					<Typography variant='body2' color='text.secondary'>
						{description}
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton onClick={handleFavorite} size='small'>
						{favorited ? (
							<FavoriteIcon color='error' />
						) : (
							<FavoriteBorderOutlinedIcon />
						)}
					</IconButton>
					<Button onClick={handleAddCartItem} size='small'>
						Add to Cart
					</Button>
				</CardActions>
			</Stack>
		</Card>
	);
}
