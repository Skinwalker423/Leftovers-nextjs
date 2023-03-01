import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MyKitchenMealCard({
	foodItem = 'Food Item',
	description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
	image = '/art.jpg',
	price,
	id,
	qty = 1,
	setMsg,
}) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia component='img' height='140' image={image} alt={foodItem} />
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{foodItem}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size='small' color='error'>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
}
