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
	kitchenImgUrl = '/kitchen2.jpg',
	description,
	isFavorited,
	userEmail,
	id,
	setMsg,
	setErrorMsg
}) {
	const { colors } = useColors();
	const [favorited, setFavorited] = useState(false);
	const [loading, setLoading] = useState(false);

	const { data: session } = useSession();
	const {
		addAndUpdateFavoritePreppers,
		removeAndUpdateFavoritePreppers,
		state
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
		kitchenImgUrl
	};

	async function handleAddFavBtn() {
		setFavorited(true);
		try {
			const data = await addAndUpdateFavoritePreppers(
				prepperDetails,
				userEmail
			);
			if (data.message) {
				setMsg(data.message);
				setTimeout(() => {
					setMsg('');
				}, 3000);
			}
			if (data.error) {
				setErrorMsg(data.error);
			}
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
		setFavorited(false);

		try {
			const data = await removeAndUpdateFavoritePreppers(
				id,
				userEmail,
				newfavoritesList
			);
			if (data.message) {
				setMsg(data.message);
				console.log('removed this prepper from my favorites');
				setTimeout(() => {
					setMsg('');
				}, 3000);
			}
			if (data.error) {
				setErrorMsg(data.error);
			}
			return data;
		} catch (err) {
			setErrorMsg(err);
		}
	}

	const handleDetailsClick = () => {
		setLoading(true);
	};

	return (
		<motion.div whileHover={{ scale: 1.05 }}>
			<Card
				sx={{
					width: { xs: '20rem', md: '25rem' },
					mx: '.5rem',
					height: '26rem',
					backgroundColor: colors.primary[400]
				}}
				key={id}
			>
				<CardHeader
					avatar={
						<Avatar
							sx={{ bgcolor: colors.orangeAccent[500] }}
							aria-label="prepper"
						>
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
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={
						<Typography variant="h4" color={'secondary'}>
							{name}
						</Typography>
					}
					subheader={subTitle}
				/>
				<CardMedia
					component="img"
					height="194"
					image={kitchenImgUrl}
					alt={name}
				/>
				<CardContent>
					<Typography
						fontSize={'small'}
						sx={{
							maxHeight: '3.5rem',
							height: '3.5rem'
						}}
						variant="body2"
						color="text.secondary"
					>
						{description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
					disableSpacing
				>
					{session && (
						<Tooltip title="Add to Favorites">
							<IconButton
								onClick={favorited ? handleRemoveFavBtn : handleAddFavBtn}
								aria-label="add to favorites"
							>
								{favorited ? (
									<FavoriteIcon fontSize="large" color="error" />
								) : (
									<FavoriteBorderOutlinedIcon fontSize="large" color="error" />
								)}
							</IconButton>
						</Tooltip>
					)}

					<TrophyLikesButton />

					<Link className={styles.link} href={`/preppers/${id}`}>
						<Button
							onClick={handleDetailsClick}
							disabled={loading}
							size="large"
							color="secondary"
							sx={{
								width: '7rem',
								height: '2.5rem',
								border: `1px solid ${colors.orangeAccent[900]}`,

								'&:hover': {
									backgroundColor: colors.orangeAccent[900],
									color: colors.primary[100]
								}
							}}
						>
							{loading ? (
								<CircularProgress color="secondary" size={'2rem'} />
							) : (
								<Typography color={'secondary'} fontSize={'small'}>
									View Details
								</Typography>
							)}
						</Button>
					</Link>
				</CardActions>
			</Card>
		</motion.div>
	);
}
