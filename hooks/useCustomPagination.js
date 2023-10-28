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
			setResultsPerPage(1);
			setPag((prevPag) => {
				return {
					...prevPag,
					end: prevPag.start + 1 > length ? length : prevPag.start + 1
				};
			});
		} else {
			setResultsPerPage(3);
			setPag((prevPag) => {
				return {
					...prevPag,
					start:
						prevPag.end > length && prevPag.end - 3 >= 0 && list.length > 2
							? prevPag.end - 3
							: 0,
					end:
						prevPag.end > length && prevPag.end - 3 >= 0 && list.length > 2
							? prevPag.end
							: prevPag.start + 3
				};
			});
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
				start:
					prevPag.end > length && prevPag.start - 3 >= 0 && list.length > 2
						? prevPag.start - resultsPerPage
						: 0,
				end:
					prevPag.end > length &&
					prevPag.end - 3 >= resultsPerPage &&
					list.length > 2
						? prevPag.end - 3
						: resultsPerPage
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
