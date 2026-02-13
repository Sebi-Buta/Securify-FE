import { Route, Routes } from "react-router";
import Home from "../../pages/home";
import Dashboard from "../../pages/dashboard";
import LogIn from "../../pages/log-in";
import Comments from "../../pages/comments";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/login" element={<LogIn />} />
			<Route path="/comments" element={<Comments />} />
		</Routes>
	);
};

export default Router;
