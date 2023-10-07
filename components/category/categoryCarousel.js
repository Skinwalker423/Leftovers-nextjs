import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box } from '@mui/material';
import { useUserContext } from '../../hooks/useUserContext';
import PrepperCard from '../Card/prepperCard';
import { useSession } from 'next-auth/react';

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
		<Box width={'100%'} position={'relative'} py={10} px={30}>
			<Carousel
				autoFocus
				showThumbs={false}
				infiniteLoop
				stopOnHover
				showArrows={true}
				showStatus={false}
			>
				{preppers}
			</Carousel>
		</Box>
	);
};

export default CategoryCarousel;
