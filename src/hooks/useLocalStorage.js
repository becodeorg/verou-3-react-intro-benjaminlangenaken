import {useEffect, useState} from 'react';

const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(() => {
		const item = localStorage.getItem('key');
		// If the item exists, return the item & JSON.parse it; otherwise return the initial value
		return item ? JSON.parse(item) : initialValue;
	});

	useEffect(() => {
		// Localstorage can't hold JSON data --> we need to stringify it
		localStorage.setItem(key, JSON.stringify(value));

		// Add [value] as a dependency so useEffect will only run when the value changes
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;
