import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesUserHome from "./pages/user-home/PagesUserHome";
import LandingPage from "./components/landing_page/LandingPage";
import Login from "./components/navbar/Login";
import Logout from "./components/navbar/Logout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/myhome" element={<PagesUserHome />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
