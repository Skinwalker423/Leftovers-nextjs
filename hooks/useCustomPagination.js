import { useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';

export const useCustomPagination = ({ list }) => {
	const [resultsPerPage, setResultsPerPage] = useState(3);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const [pag, setPag] = useState({
		start: 0,
		end: matches ? 1 : resultsPerPage
	});
	const length = list?.length - 1;
	const disableNext = pag.end > length;
	const disablePrev = pag.start <= 0;

	useEffect(() => {
		if (matches) {
			console.log('1');
			setResultsPerPage(1);
		} else {
			console.log('3');
			setResultsPerPage(3);
		}
	}, [matches]);

	const setNewPagNext = () => {
		if (pag.end > length) {
			return;
		}

		setPag((prevPag) => {
			return {
				...prevPag,
				start: prevPag.start + resultsPerPage,
				end: prevPag.end + resultsPerPage
			};
		});
	};
	const setNewPagPrev = () => {
		if (pag.start <= 0) {
			return;
		}
		setPag((prevPag) => {
			return {
				...prevPag,
				start: prevPag.start - resultsPerPage,
				end: prevPag.end - resultsPerPage
			};
		});
	};

	return {
		pag,
		setNewPagNext,
		setNewPagPrev,
		disableNext,
		disablePrev,
		length
	};
};
