import { tokens } from '../config/theme';
import { useTheme } from '@mui/material';

export const useColors = () => {
	const { palette } = useTheme();
	const colors = tokens(palette.mode);

	return { colors, palette };
};
