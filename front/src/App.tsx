import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesUserHome from "./pages/user-home/PagesUserHome";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/navbar/Login";
import Logout from "./components/navbar/Logout";
import Register from "./components/navbar/Register";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Navbar />
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
