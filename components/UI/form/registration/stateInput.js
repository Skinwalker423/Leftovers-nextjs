import React, { useState } from 'react';
import { FormControl, MenuItem, Select, InputLabel, Box } from '@mui/material';
const usaStatesArray = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY'
];

const menuItemList = usaStatesArray.map((state) => {
	return (
		<MenuItem key={state} value={state}>
			{state}
		</MenuItem>
	);
});

const StateInput = ({ setState, state, size }) => {
	function handleStateChange(e) {
		setState(e.target.value);
	}

	return (
		<Box width={'100%'}>
			<FormControl size={size} sx={{ width: '100%' }}>
				<InputLabel id="state">State</InputLabel>
				<Select
					labelId="state"
					id="state"
					label="State"
					value={state}
					defaultValue={'CA'}
					onChange={handleStateChange}
				>
					{menuItemList}
				</Select>
			</FormControl>
		</Box>
	);
};

export default StateInput;
