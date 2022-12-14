import { createContext, useReducer, useEffect } from 'react';
import useTrackLocation from '../hooks/useTrackLocation';

export const UserContext = createContext();

export const ACTION_TYPES = {
	SET_LATLONG: 'SET_LATLONG',
	SET_LOCAL_COFFEE_STORES: 'SET_LOCAL_COFFEE_STORES',
	ADD_FOOD_TO_CART: 'ADD_FOOD_TO_CART',
	INCREMENT_FOOD_ITEM: 'INCREMENT_FOOD_ITEM',
	DECREMENT_FOOD_ITEM: 'DECREMENT_FOOD_ITEM',
	SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
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
	};
	const [state, dispatch] = useReducer(userReducer, initialState);

	const calculateTotalPrice = () => {
		const { userCartlist } = state;
		let totals = 0;
		const totalPrice = userCartlist.forEach((meal) => {
			totals += meal.price * meal.qty;
		});
		console.log('total price is', totals);
		dispatch({ type: ACTION_TYPES.SET_TOTAL_PRICE, payload: totals });
		return totalPrice;
	};

	const incrementFoodItem = (mealItem) => {
		const { id, price, image, foodItem, description } = mealItem;
		const findExistingFoodItem = state.userCartlist.find(
			(item) => item.id === id
		);

		if (findExistingFoodItem === undefined || !findExistingFoodItem) {
			dispatch({ type: ACTION_TYPES.ADD_FOOD_TO_CART, payload: mealItem });
			return;
		}
		console.log(findExistingFoodItem);
		const filteredList = state.userCartlist.filter((item) => item.id !== id);
		const newCartList = [
			...filteredList,

			{
				id,
				price,
				image,
				foodItem,
				description,
				qty: findExistingFoodItem.qty + 1,
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
					price,
					image,
					foodItem,
					description,
					qty: findExistingFoodItem.qty - 1,
				},
			];
			console.log(newCartList);
			dispatch({
				type: ACTION_TYPES.DECREMENT_FOOD_ITEM,
				payload: newCartList,
			});
		}
	};

	const value = {
		state,
		dispatch,
		incrementFoodItem,
		decrementFoodItem,
		calculateTotalPrice,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
