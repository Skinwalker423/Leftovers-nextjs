import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

const SideBarMenuItem = ({ name, image, selected, setSelected, open }) => {
	return (
		<ListItem
			key={name}
			disablePadding
			sx={{
				display: {
					xs: 'flex',
					sm: 'block',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center'
				}
			}}
		>
			<ListItemButton
				onClick={() => setSelected(name)}
				selected={name === selected}
				sx={{
					minHeight: 58,
					width: '100%',
					borderRadius: { xs: '50%', sm: 'unset' },
					alignItems: { xs: 'center', sm: 'unset' },
					justifyContent: { xs: 'center', sm: open ? 'initial' : 'center' },
					px: { xs: 0, sm: 2.5 }
				}}
			>
				<Tooltip
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center'
					}}
					title={name}
				>
					<ListItemIcon
						sx={{
							display: 'flex',
							minWidth: 0,
							width: { xs: '100%', sm: 'unset' },

							mr: open ? 3 : 'auto',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{image}
					</ListItemIcon>
				</Tooltip>
				<ListItemText
					primary={name}
					sx={{
						opacity: open ? 1 : 0,
						display: 'flex',
						justifyContent: 'flex-satrt',
						alignItems: 'center'
					}}
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default SideBarMenuItem;
