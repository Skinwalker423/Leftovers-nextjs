import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import { Box } from '@mui/material';
import PrepperCard from '../Card/prepperCard';
import styles from './localPreppersList.module.css';

const LocalPreppersList = ({ userEmail, setMsg }) => {
	const { state } = useContext(UserContext);

	const preppers = state.localPreppers.map(
		({ id, description, kitchenTitle, email }) => {
			const avatar = 'https://i.pravatar.cc/300';
			if (email !== userEmail) {
				return (
					<PrepperCard
						name={kitchenTitle}
						avatar={avatar}
						id={id}
						key={id}
						description={description}
						userEmail={userEmail}
						setMsg={setMsg}
					/>
				);
			}
		}
	);

	return (
		<Box
			className={styles.prepCardContainer}
			sx={{ overflowX: { xs: 'hidden' }, overflowY: 'hidden' }}
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			flexWrap={{ xs: 'none', md: 'wrap' }}>
			{state.localPreppers && state.localPreppers.length !== 0 && preppers}
		</Box>
	);
};

export default LocalPreppersList;
