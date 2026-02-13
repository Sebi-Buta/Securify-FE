import { createTheme } from "@mui/material/styles";

const generateTheme = (mode: "light" | "dark", isSecure: "attack" | "defense") => {
	const primaryColor = isSecure == "defense" ? "#0288D1" : "#D32F2F"; // Albastru pt Defend, Roșu pt Attack
	const primaryLight = isSecure == "defense" ? "#03A9F4" : "#EF5350";
	const primaryDark = isSecure == "defense" ? "#01579B" : "#C62828";

	return createTheme({
		palette: {
			mode: mode, // 'light' sau 'dark'
			primary: {
				main: primaryColor,
				light: primaryLight,
				dark: primaryDark,
			},
			background: {
				// Fundaluri dinamice bazate pe dark/light mode
				default: mode === "dark" ? "#0A1929" : "#F0F4F8",
				paper: mode === "dark" ? "#001E3C" : "#FFFFFF",
			},
			text: {
				primary: mode === "dark" ? "#F3F6F9" : "#1A2027",
				secondary: mode === "dark" ? "#B2BAC2" : "#5C6A7B",
			},
		},
		typography: {
			fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		},
		components: {
			// Magia: adăugăm tranziții line pentru ca schimbarea de culoare să nu fie bruscă
			MuiPaper: {
				styleOverrides: {
					root: {
						transition: "background-color 0.4s ease, box-shadow 0.4s ease",
						backgroundImage: "none",
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						transition: "background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease",
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						transition: "background-color 0.4s ease",
					},
				},
			},
		},
	});
};

export default generateTheme;
