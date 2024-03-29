import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CountertopsIcon from '@mui/icons-material/Countertops';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const menuListItems = [
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
