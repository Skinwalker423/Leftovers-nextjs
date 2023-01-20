import { useState } from 'react';
import styles from './collapsedNavMenu.module.css';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useColors } from '../../../../hooks/useColors';

export default function CollapsedNavMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const { colors } = useColors();
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Tooltip title='Navagation Menu'>
				<IconButton
					id='demo-positioned-button'
					aria-controls={open ? 'demo-positioned-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}>
					<MenuIcon fontSize='large' />
				</IconButton>
			</Tooltip>
			<Menu
				id='demo-positioned-menu'
				aria-labelledby='demo-positioned-button'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}>
				<Link className={styles.link} href={'/preppers'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900], width: '10rem' }}
						onClick={handleClose}>
						Preppers
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/favorites'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900] }}
						onClick={handleClose}>
						Favs
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/about'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900] }}
						onClick={handleClose}>
						About
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/mykitchen'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900] }}
						onClick={handleClose}>
						MyKitchen
					</MenuItem>
				</Link>
			</Menu>
		</div>
	);
}
