import { createContext, useReducer, useEffect } from 'react';
// import useTrackLocation from '../hooks/useTrackLocation';
import {
	addFavoritePrepperToDb,
	removeFavoritePrepperToDb,
} from '../utils/favorites';

export const UserContext = createContext();

export const ACTION_TYPES = {
	SET_LATLONG: 'SET_LATLONG',
	SET_LOCAL_COFFEE_STORES: 'SET_LOCAL_COFFEE_STORES',
	ADD_FOOD_TO_CART: 'ADD_FOOD_TO_CART',
	INCREMENT_FOOD_ITEM: 'INCREMENT_FOOD_ITEM',
	DECREMENT_FOOD_ITEM: 'DECREMENT_FOOD_ITEM',
	CLEAR_CARTLIST: 'CLEAR_CARTLIST',
	SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
	ADD_PREPPER_FAVORITES: 'ADD_PREPPER_FAVORITES',
	REMOVE_PREPPER_FAVORITES: 'REMOVE_PREPPER_FAVORITES',
	SET_FAVORITES_LIST: 'SET_FAVORITES_LIST',
};

const userReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_LATLONG:
			return { ...state, coords: action.payload };
		case ACTION_TYPES.ADD_FOOD_TO_CART:
			return {
				...state,
				userCartlist: [...state.userCartlist, action.payload],
			};
		case ACTION_TYPES.CLEAR_CARTLIST:
			return {
				...state,
				userCartlist: null,
			};
		case ACTION_TYPES.INCREMENT_FOOD_ITEM:
			return {
				...state,
				userCartlist: action.payload,
			};
		case ACTION_TYPES.DECREMENT_FOOD_ITEM:
			return {
				...state,
				userCartlist: action.payload,
			};
		case ACTION_TYPES.SET_TOTAL_PRICE:
			return {
				...state,
				cartTotalPrice: action.payload,
			};
		case ACTION_TYPES.ADD_PREPPER_FAVORITES:
			return { ...state, favorites: [...state.favorites, action.payload] };

		case ACTION_TYPES.REMOVE_PREPPER_FAVORITES:
			return { ...state, favorites: action.payload };

		case ACTION_TYPES.SET_FAVORITES_LIST:
			return { ...state, favorites: action.payload };

		default:
			throw new Error(`unhandled action type: ${action.type}`);
	}
};

export const UserProvider = ({ children }) => {
	const initialState = {
		coords: {
			latlong: '',
			lat: null,
			long: null,
		},
		setLatLong: () => {},
		userCartlist: [],
		cartTotalPrice: 0,
		favorites: [],
	};
	const [state, dispatch] = useReducer(userReducer, initialState);

	useEffect(() => {
		if (state.userCartlist) {
			calculateTotalPrice();
		}
	}, [state.userCartlist]);

	const incrementFoodItem = (mealItem) => {
		const { id, price, image, foodItem, description, prepperEmail } = mealItem;

		const findExistingFoodItem = state.userCartlist.find(
			(item) => item.id === id
		);

		if (findExistingFoodItem === undefined || !findExistingFoodItem) {
			const newMeals = [
				...state.userCartlist,
				{
					id,
					price: parseInt(price),
					image,
					foodItem,
					description,
					qty: 1,
					prepperEmail,
				},
			];

			return dispatch({
				type: ACTION_TYPES.INCREMENT_FOOD_ITEM,
				payload: newMeals,
			});
		}
		const filteredList = state.userCartlist.filter((item) => item.id !== id);
		const newCartList = [
			...filteredList,

			{
				id,
				price: parseInt(price),
				image,
				foodItem,
				description,
				qty: findExistingFoodItem.qty + 1,
				prepperEmail,
			},
		];
		console.log(newCartList);
		dispatch({
			type: ACTION_TYPES.INCREMENT_FOOD_ITEM,
			payload: newCartList,
		});
	};
	const decrementFoodItem = (mealItem) => {
		const { id, price, image, foodItem, description } = mealItem;
		const findExistingFoodItem = state.userCartlist.find(
			(item) => item.id === id
		);
		const filteredList = state.userCartlist.filter((item) => item.id !== id);

		if (findExistingFoodItem === undefined || !findExistingFoodItem) {
			return;
		}

		if (findExistingFoodItem.qty < 2) {
			dispatch({
				type: ACTION_TYPES.DECREMENT_FOOD_ITEM,
				payload: filteredList,
			});
		} else {
			const newCartList = [
				...filteredList,

				{
					id,
					price: parseInt(price),
					image,
					foodItem,
					description,
					qty: findExistingFoodItem.qty - 1,
					prepperEmail,
				},
			];
			console.log(newCartList);
			dispatch({
				type: ACTION_TYPES.DECREMENT_FOOD_ITEM,
				payload: newCartList,
			});
		}
	};

	function calculateTotalPrice() {
		let totals = 0;
		const totalPrice = state.userCartlist.forEach((meal) => {
			return (totals += parseInt(meal.price) * meal.qty);
		});

		return dispatch({ type: ACTION_TYPES.SET_TOTAL_PRICE, payload: totals });
	}

	const addAndUpdateFavoritePreppers = async (prepperDetails, userEmail) => {
		const data = await addFavoritePrepperToDb(prepperDetails, userEmail);
		if (data.message) {
			dispatch({
				type: ACTION_TYPES.ADD_PREPPER_FAVORITES,
				payload: prepperDetails,
			});
		}
		return data;
	};
	const removeAndUpdateFavoritePreppers = async (
		id,
		userEmail,
		newfavoritesList
	) => {
		const data = await removeFavoritePrepperToDb(id, userEmail);
		if (data.message) {
			dispatch({
				type: ACTION_TYPES.REMOVE_PREPPER_FAVORITES,
				payload: newfavoritesList,
			});
		}
		return data;
	};

	const setFavoritesList = (favoriteList) => {
		dispatch({ type: ACTION_TYPES.SET_FAVORITES_LIST, payload: favoriteList });
	};

	const value = {
		state,
		dispatch,
		incrementFoodItem,
		decrementFoodItem,
		calculateTotalPrice,
		addAndUpdateFavoritePreppers,
		removeAndUpdateFavoritePreppers,
		setFavoritesList,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
