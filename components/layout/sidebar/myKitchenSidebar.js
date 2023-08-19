import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CountertopsIcon from '@mui/icons-material/Countertops';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Tooltip from '@mui/material/Tooltip';
import SideBarMenuItem from './SideBarMenuItem';

const menuListItems = [
	{
		name: 'Kitchen profile',
		image: <CountertopsIcon />
	},
	{
		name: 'My Meals',
		image: <RestaurantIcon />
	},
	{
		name: 'Personal Info',
		image: <PermIdentityIcon />
	},
	{
		name: 'Orders',
		image: <InboxIcon />
	},
	{
		name: 'Messages',
		image: <MailIcon />
	}
];

const drawerWidth = 240;
const openedMixin = (theme) => ({
	width: drawerWidth,
	top: '6em',
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	top: '6em',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	marginLeft: '4.5em',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	width: drawerWidth,

	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme)
	})
}));

export default function ResponsiveDrawer({ setSelected, selected }) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (matches) {
			handleDrawerClose();
		}
	}, [matches]);

	return (
		<Box position={'relative'} zIndex={98}>
			<Drawer
				sx={{
					'& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
						top: '5em'
					}
				}}
				variant="permanent"
				open={open}
			>
				<DrawerHeader>
					{open ? (
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					) : (
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								sx={{
									...(open && { display: 'none' }),
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: { xs: '100%', sm: 'unset' }
								}}
							>
								<MenuIcon />
							</IconButton>
						</Toolbar>
					)}
				</DrawerHeader>
				<Divider />
				<List
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						alignItems: 'space-evenly',
						height: '50%'
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
			</Drawer>
		</Box>
	);
}
