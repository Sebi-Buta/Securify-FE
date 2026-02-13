import { Drawer, useMediaQuery } from "@mui/material";
import { StyledNavDrawer } from "./index.styled";
import NavItems from "../nav-items";

interface NavDrawerProps {
	open: boolean;
	handleDrawerClose: () => void;
}

const NavDrawer = ({ open, handleDrawerClose }: NavDrawerProps) => {
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	return (
		<>
			{isMobile ? (
				<Drawer open={open} onClose={handleDrawerClose}>
					<NavItems open={open} handleDrawerClose={handleDrawerClose} />
				</Drawer>
			) : (
				<StyledNavDrawer open={open} variant="permanent" onClose={handleDrawerClose}>
					<NavItems open={open} handleDrawerClose={handleDrawerClose} />
				</StyledNavDrawer>
			)}
		</>
	);
};

export default NavDrawer;
