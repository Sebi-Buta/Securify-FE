import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Router from "./utils/router";
import HeaderNav from "./components/header-nav";
import { AppWrapper } from "./utils/app-wrapper";
import { useThemeOptions } from "./utils/store/theme";
import generateTheme from "./utils/theme";
import { useMemo } from "react";

const App = () => {
	const { userMode, themeMode } = useThemeOptions((state) => state);

	const theme = useMemo(() => generateTheme(themeMode, userMode), [themeMode, userMode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box display={"flex"}>
				<HeaderNav />
				<AppWrapper>
					<Router />
				</AppWrapper>
			</Box>
		</ThemeProvider>
	);
};

export default App;
