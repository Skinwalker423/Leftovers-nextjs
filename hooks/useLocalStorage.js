import React, { useState, useEffect } from 'react';

function getSavedValue(key, initialValue) {
	if (typeof window !== 'undefined') {
		// Perform localStorage action
		const item = localStorage.getItem('key');
		const storedValue = JSON.parse(window.localStorage.getItem(key));

		if (storedValue) return storedValue;
		if (initialValue instanceof Function) return initialValue();
		return initialValue;
	}
}

const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(() => {
		return getSavedValue(key, initialValue);
	});

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;
