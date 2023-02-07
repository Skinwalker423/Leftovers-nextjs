import { useState } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import styles from './prepperCard.module.css';
import { useColors } from '../../hooks/useColors';
import { addFavoritePrepperToDb } from '../../utils/favorites';

export default function PrepperCard({
	avatar = 'https://i.pravatar.cc/300',
	name,
	email,
	subTitle,
	kitchenImg = '/art.jpg',
	description,
	userEmail,
	id,
}) {
	const { colors } = useColors();
	const [favorited, setFavorited] = useState(false);

	const prepperDetails = {
		id,
		name,
		email,
	};

	async function handleAddFavBtn() {
		setFavorited(true);
		const data = await addFavoritePrepperToDb(prepperDetails, userEmail);
		console.log(data);
		return data;
	}

	function handleRemoveFavBtn() {
		setFavorited(false);
		console.log('removed this prepper from my favorites');
	}

	return (
		<Card className={styles.prepCard} key={id}>
			<CardHeader
				avatar={
					<Avatar
						sx={{ bgcolor: colors.orangeAccent[500] }}
						aria-label='prepper'>
						<Image
							style={{ objectFit: 'fill', borderRadius: '50%' }}
							src={avatar}
							width={37}
							height={37}
							alt={`avatar for ${name}`}
						/>
					</Avatar>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={name}
				subheader={subTitle}
			/>
			<CardMedia component='img' height='194' image={kitchenImg} alt={name} />
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					This impressive paella is a perfect party dish and a fun meal to cook
					together with your guests. Add 1 cup of frozen peas along with the
					mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				disableSpacing>
				<IconButton
					onClick={favorited ? handleRemoveFavBtn : handleAddFavBtn}
					aria-label='add to favorites'>
					{favorited ? (
						<FavoriteIcon color='error' />
					) : (
						<FavoriteBorderOutlinedIcon color='error' />
					)}
				</IconButton>
				<Link className={styles.link} href={`/preppers/${id}`}>
					<Button
						sx={{
							border: `1px solid ${colors.orangeAccent[900]}`,
							color: colors.orangeAccent[400],
							'&:hover': {
								backgroundColor: colors.orangeAccent[900],
								color: 'white',
							},
						}}>
						View Details
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
}
