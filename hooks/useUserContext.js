import { UserContext } from '../store/UserContext';
import { useContext } from 'react';

export const useUserContext = () => {
	const {
		state,
		dispatch,
		incrementFoodItem,
		decrementFoodItem,
		calculateTotalPrice,
		addAndUpdateFavoritePreppers,
		removeAndUpdateFavoritePreppers,
		setFavoritesList,
		setDefaultZipcode
	} = useContext(UserContext);

	return {
		state,
		dispatch,
		incrementFoodItem,
		decrementFoodItem,
		calculateTotalPrice,
		addAndUpdateFavoritePreppers,
		removeAndUpdateFavoritePreppers,
		setFavoritesList,
		setDefaultZipcode
	};
};
