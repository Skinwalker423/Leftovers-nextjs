import { useState } from 'react';
import styles from './collapsedNavMenu.module.css';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useColors } from '../../../../hooks/useColors';
import { useRouter } from 'next/router';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import { Typography } from '@mui/material';

export default function CollapsedNavMenu() {
	const router = useRouter();
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
			<Tooltip title="Navagation Menu">
				<IconButton
					id="nav-button"
					aria-controls={open ? 'nav-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<MenuIcon fontSize="large" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ width: '50rem', display: { md: 'none' } }}
				id="nav-menu"
				aria-labelledby="nav-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				<Link className={styles.link} href={'/'}>
					<MenuItem
						sx={{
							color: colors.orangeAccent[900],
							gap: 2,
							width: '20rem'
						}}
						onClick={handleClose}
					>
						<HomeOutlinedIcon />
						<Typography fontSize={'medium'}>Home</Typography>
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/preppers'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900] }}
						onClick={handleClose}
					>
						Preppers
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/favorites'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900] }}
						onClick={handleClose}
					>
						Favs
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/about'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900] }}
						onClick={handleClose}
					>
						About
					</MenuItem>
				</Link>
				{router.asPath !== '/register' && (
					<Link className={styles.link} href={'/register'}>
						<MenuItem
							sx={{ color: colors.orangeAccent[900] }}
							onClick={handleClose}
						>
							Register
						</MenuItem>
					</Link>
				)}
			</Menu>
		</div>
	);
}
