import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
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
import { useSession } from 'next-auth/react';
import { Alert, Tooltip } from '@mui/material';
import { UserContext } from '../../store/UserContext';
import TrophyLikesButton from '../likes/trophyLikesButton';
import CircularProgress from '@mui/material/CircularProgress';

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
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { data: session } = useSession();
	const {
		addAndUpdateFavoritePreppers,
		removeAndUpdateFavoritePreppers,
		state,
	} = useContext(UserContext);

	useEffect(() => {
		setFavorited(isFavorited);
		setLoading(false);
	}, []);

	const prepperDetails = {
		id,
		name,
		email,
		description,
	};

	async function handleAddFavBtn() {
		setFavorited(true);
		try {
			const data = await addAndUpdateFavoritePreppers(
				prepperDetails,
				userEmail
			);
			return data;
		} catch (err) {
			setErrorMsg('problem adding to favorites', err);
		}
	}

	async function handleRemoveFavBtn() {
		if (!userEmail || !id) {
			setErrorMsg('no userEmail / prepper id found');
			return;
		}
		const newfavoritesList =
			state.favorites && state.favorites.filter((prepper) => id !== prepper.id);
		console.log(newfavoritesList);
		setFavorited(false);

		try {
			const data = await removeAndUpdateFavoritePreppers(
				id,
				userEmail,
				newfavoritesList
			);
			if (data.message) {
				console.log('removed this prepper from my favorites');
			}
			return data;
		} catch (err) {
			setErrorMsg(err);
		}
	}

	const handleDetailsClick = () => {
		setLoading(true);
	};

	const lorem =
		'Vestibulum condimentum sed leo at posuere. Nunc leo neque, commodo a placerat vel, consequat elementum quam. Sed dictum ac urna at bibendum. Phasellus enim tellus, dictum ut vestibulum et, blandit at diam. Donec aliquam ut magna ac auctor.';

	return (
		<motion.div whileHover={{ scale: 1.05 }}>
			<Card
				sx={{
					width: { xs: '80%', sm: '20rem', md: '25rem' },
					m: '2rem',
					maxWidth: '25rem',
					height: '26rem',
				}}
				className={styles.prepCard}
				key={id}>
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
					<Typography
						sx={{
							maxHeight: '3.5rem',
							height: '3.5rem',
						}}
						variant='body2'
						color='text.secondary'>
						{lorem}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					disableSpacing>
					{session && (
						<Tooltip title='Add to Favorites'>
							<IconButton
								onClick={favorited ? handleRemoveFavBtn : handleAddFavBtn}
								aria-label='add to favorites'>
								{favorited ? (
									<FavoriteIcon fontSize='large' color='error' />
								) : (
									<FavoriteBorderOutlinedIcon fontSize='large' color='error' />
								)}
							</IconButton>
						</Tooltip>
					)}

					<TrophyLikesButton />

					<Link className={styles.link} href={`/preppers/${id}`}>
						<Button
							onClick={handleDetailsClick}
							disabled={loading}
							size='large'
							sx={{
								width: '7rem',
								height: '2.5rem',
								border: `1px solid ${colors.orangeAccent[900]}`,
								color: colors.orangeAccent[400],
								'&:hover': {
									backgroundColor: colors.orangeAccent[900],
									color: 'white',
								},
							}}>
							{loading ? (
								<CircularProgress size={'2rem'} />
							) : (
								<Typography fontSize={'small'}>View Details</Typography>
							)}
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
		</motion.div>
	);
}
