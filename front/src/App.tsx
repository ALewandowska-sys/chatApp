import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesUserHome from "./pages/user-home/PagesUserHome";
import LandingPage from "./components/landing_page/LandingPage";
import Logout from "./components/navbar/Logout";
import Navbar from "./components/navbar/registration/Navbar";
import PagesUserFriends from "./pages/user-home/user-friends/PagesUserFriends";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/myhome" element={<PagesUserHome />} />
				<Route path="/friends" element={<PagesUserFriends />} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
