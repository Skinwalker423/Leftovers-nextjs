import { createContext, useReducer, useEffect } from 'react';
import useTrackLocation from '../hooks/useTrackLocation';

export const UserContext = createContext();

export const ACTION_TYPES = {
	SET_LATLONG: 'SET_LATLONG',
	SET_LOCAL_COFFEE_STORES: 'SET_LOCAL_COFFEE_STORES',
	ADD_FOOD_TO_CART: 'ADD_FOOD_TO_CART',
	INCREMENT_FOOD_ITEM: 'INCREMENT_FOOD_ITEM',
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
			const filteredList = state.userCartlist.filter(
				(item) => item.id !== action.payload.id
			);
			console.log(filteredList);
			return {
				...state,
				userCartlist: [...filteredList, action.payload],
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
		userCartlist: [],
		setLatLong: () => {},
	};
	const [state, dispatch] = useReducer(userReducer, initialState);

	const value = { state, dispatch };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
