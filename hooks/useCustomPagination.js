import React, { useState } from 'react';

export const useCustomPagination = ({ list, resultsPerPage }) => {
	console.log('list', list);

	const [pag, setPag] = useState({ start: 0, end: resultsPerPage });
	const length = list?.length - 1;
	const disableNext = pag.end > length - 1;
	const disablePrev = pag.start <= 0;

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
