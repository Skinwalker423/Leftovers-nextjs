import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

const SideBarMenuItem = ({ name, image, selected, setSelected, open }) => {
	return (
		<ListItem key={name} disablePadding sx={{ display: 'block' }}>
			<ListItemButton
				onClick={() => setSelected(name)}
				selected={name === selected}
				sx={{
					minHeight: 58,
					justifyContent: open ? 'initial' : 'center',
					px: 2.5
				}}
			>
				<Tooltip title={name}>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: open ? 3 : 'auto',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{image}
					</ListItemIcon>
				</Tooltip>
				<ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
			</ListItemButton>
		</ListItem>
	);
};

export default SideBarMenuItem;
