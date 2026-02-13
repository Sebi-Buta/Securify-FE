import { DrawerHeader } from "../nav-drawer/index.styled";
import { Box, Button, Divider, IconButton, Step, StepButton, StepContent, Stepper, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { steps } from "./constants";
import { useState } from "react";
import { useNavigate } from "react-router";

interface NavItemsProps {
	open: boolean;
	handleDrawerClose: () => void;
}

const NavItems = ({ open, handleDrawerClose }: NavItemsProps) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState<{
		[k: number]: boolean;
	}>({});

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
					// find the first step that has been completed
					steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number, link: string) => () => {
		setActiveStep(step);
		navigate(link);
	};

	const handleComplete = () => {
		setCompleted({
			...completed,
			[activeStep]: true,
		});
		handleNext();
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};

	return (
		<Box sx={{ padding: 2 }}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
			</DrawerHeader>
			<Stepper nonLinear activeStep={activeStep} orientation="vertical">
				{steps.map(({ label, description, link }, index) => (
					<Step key={label} completed={completed[index]}>
						<StepButton color="inherit" onClick={handleStep(index, link)}>
							{open && label}
						</StepButton>
						{open && (
							<StepContent>
								<Typography width="100%" height="auto" whiteSpace="pre-line" variant="subtitle2">
									{description}
								</Typography>
							</StepContent>
						)}
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default NavItems;
