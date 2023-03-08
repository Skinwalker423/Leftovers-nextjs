import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { removeMeal } from '../../utils/meals';

export default function MyKitchenMealCard({
	foodItem = 'Food Item',
	description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
	image = '/art.jpg',
	price,
	id,
	qty = 1,
	setMsg,
	prepperEmail,
	setMeals,
}) {
	const handleRemoveMeal = async () => {
		const data = await removeMeal(prepperEmail, id);
		if (data.message) {
			console.log('meal removed');
			setMeals((meals) => {
				return meals.filter((meal) => meal.id !== id);
			});
			setMsg(data.message);
		}
	};

	return (
		<Card key={id} sx={{ maxWidth: 345 }}>
			<CardMedia component='img' height='140' image={image} alt={foodItem} />
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{foodItem}
				</Typography>
			</CardContent>

			<CardActions>
				<Button
					onClick={handleRemoveMeal}
					size='small'
					color='error'
					variant='contained'>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
}
