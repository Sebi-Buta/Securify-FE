import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../../pages/home";
import Dashboard from "../../pages/dashboard";
import LogIn from "../../pages/log-in";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/login" element={<LogIn />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
