import { IconButton, Switch, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledHeader, ThemeToggle } from "./index.styled";
import { useThemeOptions } from "../../utils/store/theme";

interface HeaderProps {
	handleDrawerOpen: () => void;
	open: boolean;
}

const Header = ({ handleDrawerOpen, open }: HeaderProps) => {
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const { themeMode, toggleTheme, userMode, toggleUserMode } = useThemeOptions((state) => state);

	return (
		<StyledHeader position="fixed" open={open} isMobile={isMobile}>
			<Toolbar>
				<IconButton
					color="inherit"
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
				<Typography variant="h6" noWrap component="div">
					Mini variant drawer
				</Typography>
				<ThemeToggle checked={themeMode === "dark"} onChange={toggleTheme} />
				<Switch checked={userMode === "defense"} onChange={toggleUserMode} />
			</Toolbar>
		</StyledHeader>
	);
};

export default Header;
