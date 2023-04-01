import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { removeMeal } from '../../utils/meals';
import { updateMealQtyInDb } from '../../utils/meals';
import UpdateQtyForm from '../UI/form/mykitchen/updateQtyForm';

export default function MyKitchenMealCard({
	foodItem = 'Food Item',
	description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
	image = '/art.jpg',
	price,
	id,
	qty = 1,
	setMsg,
	setError,
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
		} else if (data.error) {
			setError(data.error);
		}
		setTimeout(() => {
			setError('');
			setMsg('');
		}, 3000);
	};

	const handleOutOfStock = async () => {
		//add banner to meal card
		const data = await updateMealQtyInDb(prepperEmail, id, 0);
		if (data.message) {
			setMsg(data.message);
		} else if (data.error) {
			setError(data.error);
		}
		setTimeout(() => {
			setError('');
			setMsg('');
		}, 3000);
	};

	const handleQtyUpdate = async () => {
		//adjust qty in db
	};

	return (
		<Card key={id} sx={{ width: 350 }}>
			<CardMedia component='img' height='140' image={image} alt={foodItem} />
			<CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Typography
					color={'secondary'}
					gutterBottom
					variant='h5'
					component='div'>
					{foodItem}
				</Typography>
				<Typography
					color={'secondary'}
					gutterBottom
					variant='h5'
					component='div'>
					QTY: {qty}
				</Typography>
			</CardContent>

			<CardActions>
				<Box width='100%' display={'flex'} justifyContent='space-evenly'>
					<Button
						onClick={handleRemoveMeal}
						size='small'
						color='error'
						variant='contained'>
						Remove
					</Button>
					<Button
						onClick={handleOutOfStock}
						size='small'
						color='warning'
						variant='contained'>
						Out of Stock
					</Button>
					<UpdateQtyForm email={prepperEmail} mealId={id} setMsg={setMsg} />
				</Box>
			</CardActions>
		</Card>
	);
}
