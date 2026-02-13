import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const AppWrapper = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(8),
	padding: theme.spacing(3),
}));
