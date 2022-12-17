import React, { useState, useContext } from 'react';
import { ACTION_TYPES, UserContext } from '../store/UserContext';

const useTrackLocation = () => {
	const [locationErrorMsg, setLocationErrorMsg] = useState('');
	const { dispatch } = useContext(UserContext);
	const [isFindingLocation, setIsFindingLocation] = useState(false);

	const success = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		dispatch({
			type: ACTION_TYPES.SET_LATLONG,
			payload: `${latitude},${longitude}`,
		});
		setLocationErrorMsg('');
		setIsFindingLocation(false);
	};

	const error = () => {
		setLocationErrorMsg('Unable to retrieve your location');
		setIsFindingLocation(false);
	};

	const handleTrackLocation = () => {
		setIsFindingLocation(true);
		if (!navigator.geolocation) {
			setLocationErrorMsg('Geolocation is not supported by your browser');
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	return {
		handleTrackLocation,
		locationErrorMsg,
		isFindingLocation,
	};
};

export default useTrackLocation;
