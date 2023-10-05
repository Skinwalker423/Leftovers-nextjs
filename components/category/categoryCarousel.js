import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box, Typography } from '@mui/material';
import { useUserContext } from '../../hooks/useUserContext';
import PrepperCard from '../Card/prepperCard';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const CategoryCarousel = ({ list, title, setMsg, setErrorMsg }) => {
	const { state } = useUserContext();
	const { data: session } = useSession();
	const favoritesPrepId = state.favorites.map(({ id }) => id);

	const userEmail = session?.user?.email;

	const preppers = list.map(
		({
			id,
			description,
			kitchenTitle,
			email,
			kitchenImgUrl,
			profileImgUrl,
			mealsServed
		}) => {
			const favorited =
				state.favorites && favoritesPrepId.includes(id) ? true : false;

			const avatar = 'https://i.pravatar.cc/300';

			return (
				<PrepperCard
					isFavorited={favorited}
					name={kitchenTitle}
					avatar={profileImgUrl || avatar}
					id={id}
					key={id}
					description={description}
					userEmail={userEmail}
					setMsg={setMsg}
					setErrorMsg={setErrorMsg}
					kitchenImgUrl={kitchenImgUrl}
					mealsServed={mealsServed}
				/>
			);
		}
	);

	return (
		<Box
			width={'100%'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			position={'relative'}
		>
			<Box
				width={'500px'}
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				position={'relative'}
			>
				<Typography variant="h1">{title}</Typography>
				<Carousel
					autoFocus
					showThumbs={false}
					// autoPlay
					// interval={4000}
					infiniteLoop
					stopOnHover
					showArrows={true}
					showStatus={false}
				>
					{preppers}
				</Carousel>
			</Box>
		</Box>
	);
};

export default CategoryCarousel;
