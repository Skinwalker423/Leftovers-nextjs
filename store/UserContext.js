import { createContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {
	addFavoritePrepperToDb,
	removeFavoritePrepperToDb
} from '../utils/favorites';

export const UserContext = createContext();

export const ACTION_TYPES = {
	SET_LATLONG: 'SET_LATLONG',
	SET_LOCAL_COFFEE_STORES: 'SET_LOCAL_COFFEE_STORES',
	SET_CARTLIST: 'SET_CARTLIST',
	ADD_FOOD_TO_CART: 'ADD_FOOD_TO_CART',
	INCREMENT_FOOD_ITEM: 'INCREMENT_FOOD_ITEM',
	DECREMENT_FOOD_ITEM: 'DECREMENT_FOOD_ITEM',
	CLEAR_CARTLIST: 'CLEAR_CARTLIST',
	SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
	ADD_PREPPER_FAVORITES: 'ADD_PREPPER_FAVORITES',
	REMOVE_PREPPER_FAVORITES: 'REMOVE_PREPPER_FAVORITES',
	SET_FAVORITES_LIST: 'SET_FAVORITES_LIST',
	SET_LOCALPREPPERS_LIST: 'SET_LOCALPREPPERS_LIST',
	SET_DEFAULT_ZIPCODE: 'SET_DEFAULT_ZIPCODE',
	SET_SEARCHED_PREPPERS_LIST: 'SET_SEARCHED_PREPPERS_LIST'
};

const userReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_LATLONG:
			return { ...state, coords: action.payload };
		case ACTION_TYPES.ADD_FOOD_TO_CART:
			return {
				...state,
				userCartlist: [...state.userCartlist, action.payload]
			};
		case ACTION_TYPES.SET_CARTLIST:
			return {
				...state,
				userCartlist: [...action.payload]
			};
		case ACTION_TYPES.CLEAR_CARTLIST:
			return {
				...state,
				userCartlist: []
			};
		case ACTION_TYPES.INCREMENT_FOOD_ITEM:
			return {
				...state,
				userCartlist: action.payload
			};
		case ACTION_TYPES.DECREMENT_FOOD_ITEM:
			return {
				...state,
				userCartlist: action.payload
			};
		case ACTION_TYPES.SET_TOTAL_PRICE:
			return {
				...state,
				cartTotalPrice: action.payload
			};
		case ACTION_TYPES.ADD_PREPPER_FAVORITES:
			return { ...state, favorites: [...state.favorites, action.payload] };

		case ACTION_TYPES.REMOVE_PREPPER_FAVORITES:
			return { ...state, favorites: action.payload };

		case ACTION_TYPES.SET_FAVORITES_LIST:
			return { ...state, favorites: action.payload };

		case ACTION_TYPES.SET_LOCALPREPPERS_LIST:
			return { ...state, localPreppers: action.payload };
		case ACTION_TYPES.SET_SEARCHED_PREPPERS_LIST:
			return { ...state, searchedPreppers: action.payload };
		case ACTION_TYPES.SET_DEFAULT_ZIPCODE:
			return { ...state, defaultZipcode: action.payload };

		default:
			throw new Error(`unhandled action type: ${action.type}`);
	}
};

export const UserProvider = ({ children }) => {
	const initialState = {
		coords: {
			latlong: '',
			lat: null,
			long: null
		},
		setLatLong: () => {},
		userCartlist: [],
		cartTotalPrice: 0,
		favorites: [],
		localPreppers: [],
		defaultZipcode: null,
		searchedPreppers: []
	};
	const [state, dispatch] = useReducer(userReducer, initialState);
	const [value, setValue] = useLocalStorage('cartlist', state.userCartlist);

	useEffect(() => {
		if (state.userCartlist) {
			calculateTotalPrice();
			setValue([...state.userCartlist]);
		} else {
			setValue('');
		}
	}, [state.userCartlist.length]);

	useEffect(() => {
		if (value.length) {
			dispatch({ type: ACTION_TYPES.SET_CARTLIST, payload: value });
		}
	}, [value]);

	const incrementFoodItem = (mealItem) => {
		const {
			id,
			price,
			image,
			foodItem,
			description,
			prepperEmail,
			prepperId,
			kitchen
		} = mealItem;

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
					prepperId,
					kitchen
				}
			];

			return dispatch({
				type: ACTION_TYPES.INCREMENT_FOOD_ITEM,
				payload: newMeals
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
				prepperId,
				kitchen
			}
		];

		dispatch({
			type: ACTION_TYPES.INCREMENT_FOOD_ITEM,
			payload: newCartList
		});
	};
	const decrementFoodItem = (mealItem) => {
		const {
			id,
			price,
			image,
			foodItem,
			description,
			prepperEmail,
			prepperId,
			kitchen
		} = mealItem;
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
				payload: filteredList
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
					prepperId,
					kitchen
				}
			];

			dispatch({
				type: ACTION_TYPES.DECREMENT_FOOD_ITEM,
				payload: newCartList
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
				payload: prepperDetails
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
				payload: newfavoritesList
			});
		}
		return data;
	};

	const setFavoritesList = (favoriteList) => {
		dispatch({ type: ACTION_TYPES.SET_FAVORITES_LIST, payload: favoriteList });
	};
	const setDefaultZipcode = (zipcode) => {
		dispatch({ type: ACTION_TYPES.SET_DEFAULT_ZIPCODE, payload: zipcode });
	};

	const valueProps = {
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

	return (
		<UserContext.Provider value={valueProps}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
