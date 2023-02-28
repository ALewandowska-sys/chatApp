import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import PagesUserHome from "./pages/user-home/PagesUserHome";
import LandingPage from "./components/landing_page/LandingPage";
import Login from "./components/navbar/Login";
import Logout from "./components/navbar/Logout";
import Register from "./components/navbar/Register";

function App() {
	return (
		<BrowserRouter>
			<LandingPage />
			{/* <Header /> */}
			<Routes>
				<Route path="/myhome" element={<PagesUserHome />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
