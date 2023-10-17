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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function CollapsedNavMenu() {
	const router = useRouter();
	const { data: session } = useSession();
	const [anchorEl, setAnchorEl] = useState(null);
	const { colors } = useColors();
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	console.log('session in collapsed menu', session);

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
						<HomeOutlinedIcon fontSize="large" />
						<Typography fontSize={'large'}>Home</Typography>
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/preppers'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900], gap: 2 }}
						onClick={handleClose}
					>
						<GroupsOutlinedIcon fontSize={'large'} />
						<Typography fontSize={'large'}>Preppers</Typography>
					</MenuItem>
				</Link>
				{session && (
					<Link className={styles.link} href={'/favorites'}>
						<MenuItem
							sx={{ color: colors.orangeAccent[900], gap: 2 }}
							onClick={handleClose}
						>
							<FavoriteBorderOutlinedIcon fontSize={'large'} />
							<Typography fontSize={'large'}>Favorites</Typography>
						</MenuItem>
					</Link>
				)}
				<Link className={styles.link} href={'/about'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900], gap: 2 }}
						onClick={handleClose}
					>
						<InfoOutlinedIcon fontSize={'large'} />
						<Typography fontSize={'large'}>About</Typography>
					</MenuItem>
				</Link>

				<Link className={styles.link} href={'/register'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900], gap: 2 }}
						onClick={handleClose}
					>
						<HowToRegIcon fontSize={'large'} />
						<Typography fontSize={'large'}>Register</Typography>
					</MenuItem>
				</Link>
				<Link className={styles.link} href={'/myKitchen'}>
					<MenuItem
						sx={{ color: colors.orangeAccent[900], gap: 2 }}
						onClick={handleClose}
					>
						<FoodBankOutlinedIcon fontSize={'large'} />
						<Typography fontSize={'large'}>MyKitchen</Typography>
					</MenuItem>
				</Link>
			</Menu>
		</div>
	);
}
