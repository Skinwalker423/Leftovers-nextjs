import { Typography } from '@mui/material';
import { useColors } from '../../hooks/useColors';

const MyKitchenHeader = () => {
	const { colors } = useColors();
	return (
		<Typography
			sx={{ py: 2, borderBottom: `1px solid ${colors.gray[900]}` }}
			color={colors.gray[900]}
			variant="h1"
		>
			Kitchen Profile
		</Typography>
	);
};

export default MyKitchenHeader;
