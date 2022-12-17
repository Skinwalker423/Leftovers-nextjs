import { createContext, useReducer, useEffect } from 'react';
import useTrackLocation from '../hooks/useTrackLocation';

export const UserContext = createContext();

export const ACTION_TYPES = {
	SET_LATLONG: 'SET_LATLONG',
	SET_LOCAL_COFFEE_STORES: 'SET_LOCAL_COFFEE_STORES',
};

const userReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_LATLONG:
			return { ...state, latLong: action.payload };
		default:
			throw new Error(`unhandled action type: ${action.type}`);
	}
};

export const UserProvider = ({ children }) => {
	const initialState = {
		latLong: '',
		setLatLong: () => {},
	};
	const [state, dispatch] = useReducer(userReducer, initialState);

	const value = { state, dispatch };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
