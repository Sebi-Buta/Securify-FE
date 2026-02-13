import { IconButton, ToggleButton, ToggleButtonGroup, Toolbar, Tooltip, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledHeader, ThemeToggle } from "./index.styled";
import { useThemeOptions } from "../../utils/store/theme";
import SecurityIcon from "@mui/icons-material/Security";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useState } from "react";

interface HeaderProps {
	handleDrawerOpen: () => void;
	open: boolean;
}

const Header = ({ handleDrawerOpen, open }: HeaderProps) => {
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const { themeMode, toggleTheme, userMode, toggleUserMode } = useThemeOptions((state) => state);
	const [mode, setMode] = useState<"attack" | "defense">(userMode);

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newMode: "attack" | "defense") => {
		if (newMode !== null) {
			setMode(newMode);
			toggleUserMode(newMode);
		}
	};

	return (
		<StyledHeader position="fixed" open={open} isMobile={isMobile}>
			<Toolbar>
				<IconButton
					aria-label="open drawer"
					onClick={() => handleDrawerOpen()}
					edge="start"
					sx={[
						{
							marginRight: 5,
						},
						open && { display: "none" },
					]}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6">Securify</Typography>
				<ThemeToggle checked={themeMode === "dark"} onChange={toggleTheme} />
				<ToggleButtonGroup color="primary" value={mode} exclusive onChange={handleChange} aria-label="Platform">
					<Tooltip arrow title="Modul vulnerabil pentru a demonstra vulnerabilitățile aplicației.">
						<ToggleButton value="attack">
							<LockOpenIcon />
							Vulnerabil
						</ToggleButton>
					</Tooltip>
					<Tooltip arrow title="Modul securizat pentru a demonstra aplicația într-o stare sigură.">
						<ToggleButton value="defense">
							Securizat <SecurityIcon />
						</ToggleButton>
					</Tooltip>
				</ToggleButtonGroup>
			</Toolbar>
		</StyledHeader>
	);
};

export default Header;
