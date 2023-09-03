import { List } from '@mui/material';
import React from 'react';
import SideBarMenuItem from '../sidebar/SideBarMenuItem';
import { menuListItems } from '../../../constants';

const MyKitchenBottomBar = () => {
	return (
		<Box
			width={'100%'}
			height={'7rem'}
			display={'flex'}
			position={'fixed'}
			bottom={0}
			zIndex={99}
		>
			<List
				sx={{
					display: 'flex',

					justifyContent: 'space-evenly',
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
						open={open}
					/>
				))}
			</List>
		</Box>
	);
};

export default MyKitchenBottomBar;
