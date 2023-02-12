import { useState, useEffect } from 'react';
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
import {
	addFavoritePrepperToDb,
	removeFavoritePrepperToDb,
} from '../../utils/favorites';
import { useSession } from 'next-auth/react';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';

export default function PrepperCard({
	avatar = 'https://i.pravatar.cc/300',
	name,
	email,
	subTitle,
	kitchenImg = '/art.jpg',
	description,
	isFavorited,
	userEmail,
	id,
}) {
	const { colors } = useColors();
	const [favorited, setFavorited] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { data: session } = useSession();
	const router = useRouter();

	const refreshData = () => {
		router.push(router.asPath);
	};

	useEffect(() => {
		setFavorited(isFavorited);
	}, []);

	const prepperDetails = {
		id,
		name,
		email,
	};

	async function handleAddFavBtn() {
		setFavorited(true);
		const data = await addFavoritePrepperToDb(prepperDetails, userEmail);
		return data;
	}

	async function handleRemoveFavBtn() {
		if (!userEmail || !id) {
			setErrorMsg('no userEmail / prepper id found');
			return;
		}
		setFavorited(false);
		try {
			const data = await removeFavoritePrepperToDb(id, userEmail);
			if (data.message) {
				console.log('removed this prepper from my favorites');
				refreshData();
			}
			return data;
		} catch (err) {
			setErrorMsg(err);
		}
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
					justifyContent: session ? 'space-between' : 'flex-end',
					alignItems: 'center',
				}}
				disableSpacing>
				{session && (
					<IconButton
						onClick={favorited ? handleRemoveFavBtn : handleAddFavBtn}
						aria-label='add to favorites'>
						{favorited ? (
							<FavoriteIcon color='error' />
						) : (
							<FavoriteBorderOutlinedIcon color='error' />
						)}
					</IconButton>
				)}
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
			{errorMsg && (
				<Alert
					sx={{
						width: '50%',
						fontSize: 'larger',
					}}
					severity='error'>
					{errorMsg}
				</Alert>
			)}
		</Card>
	);
}
