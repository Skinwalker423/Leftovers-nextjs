import { Box, List } from '@mui/material';
import React from 'react';
import SideBarMenuItem from '../sidebar/SideBarMenuItem';
import { menuListItems } from '../../../constants';

const MyKitchenBottomBar = ({ setSelected, selected }) => {
	return (
		<Box
			sx={{ backgroundColor: 'white' }}
			width={'100%'}
			height={'7rem'}
			display={'flex'}
			position={'fixed'}
			justifyContent={'center'}
			alignItems={'center'}
			bottom={0}
			zIndex={99}
		>
			<List
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center'
				}}
			>
				{menuListItems.map((item) => (
					<SideBarMenuItem
						name={item.name}
						image={item.image}
						key={item.name}
						setSelected={setSelected}
						selected={selected}
					/>
				))}
			</List>
		</Box>
	);
};

export default MyKitchenBottomBar;
