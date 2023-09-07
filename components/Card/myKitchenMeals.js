import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import { removeMeal } from '../../utils/meals';
import { updateMealQtyInDb } from '../../utils/meals';
import UpdateQtyForm from '../UI/form/mykitchen/updateQtyForm';
import AreYouSure from '../UI/modal/areYouSure';
import MealImageUpatesOptions from '../myKitchen/meals/mealImageUpates';
import { Divider } from '@mui/material';
import { useColors } from '../../hooks/useColors';

export default function MyKitchenMealCard({
	foodItem = 'Food Item',
	description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
	image = '/images/cooking/defaultMeal.jpg',
	price,
	id,
	qty = 1,
	setMsg,
	setError,
	prepperEmail,
	setMeals,
	savedMealImages
}) {
	const defaultMealImg = image ? image : '/images/cooking/defaultMeal.jpg';
	const [mealImage, setMealImage] = useState(defaultMealImg);

	const { colors } = useColors();

	const handleRemoveMeal = async () => {
		const data = await removeMeal(prepperEmail, id);
		if (data.message) {
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
			setMeals((meals) => {
				return meals.map((meal) => {
					if (meal.id === id) {
						return { ...meal, qty: 0 };
					} else return { ...meal };
				});
			});
		} else if (data.error) {
			setError(data.error);
		}
		setTimeout(() => {
			setError('');
			setMsg('');
		}, 3000);
	};

	return (
		<Card key={id} sx={{ width: { xs: 275, sm: 350 } }}>
			<CardMedia
				component="img"
				height="140"
				image={mealImage}
				alt={foodItem}
			/>
			<CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Typography
					color={'secondary'}
					gutterBottom
					variant="h5"
					component="div"
				>
					{foodItem}
				</Typography>
				<Typography
					color={'secondary'}
					gutterBottom
					variant="h5"
					component="div"
				>
					QTY: {qty}
				</Typography>
			</CardContent>
			<CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
				<Box
					pb={'1rem'}
					width="100%"
					display={'flex'}
					justifyContent="space-evenly"
				>
					<AreYouSure
						title={`Remove ${foodItem}`}
						text="Are you sure you want to remove this meal from your kitchen?"
						onConfirmationClick={handleRemoveMeal}
						buttonTitle="REMOVE"
						buttonColor="error"
					/>
					<AreYouSure
						title={`Out of Stock`}
						text='Are you sure you want to set this meal as "Out of Stock"?'
						onConfirmationClick={handleOutOfStock}
						buttonTitle="OUT OF STOCK"
						buttonColor="warning"
					/>

					<UpdateQtyForm
						email={prepperEmail}
						mealId={id}
						setMsg={setMsg}
						setMeals={setMeals}
					/>
				</Box>
				<Divider flexItem variant="middle" color={colors.orangeAccent[900]} />
				<MealImageUpatesOptions
					mealImage={mealImage}
					mealId={id}
					setMealImage={setMealImage}
					setMsg={setMsg}
					savedMealImages={savedMealImages}
					prepperEmail={prepperEmail}
					setError={setError}
				/>
			</CardActions>
		</Card>
	);
}
