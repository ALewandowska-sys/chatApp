import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesUserHome from "./pages/user-home/PagesUserHome";
import LandingPage from "./pages/landing_page/LandingPage";
import Logout from "./components/logout/Logout";
import PagesUserFriends from "./pages/user-home/user-friends/PagesUserFriends";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserProfile from "./components/user_profile/UserProfile";
import Navbar from "./components/navbar/not_logged/Navbar";
import NavbarUser from "./components/navbar/logged_in/NavbarUser";

function App() {

	return (
		<BrowserRouter>
			{/* TODO */}
			<Navbar /> 
			<NavbarUser />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/myhome" element={<PagesUserHome />} />
				<Route path="/friends" element={<PagesUserFriends />} />
				<Route
					path="/profile"
					element={
						<UserProfile
							user={{
								login: "tomekHej",
								city: "Gdansk",
								age: 25,
								avatarUrl: "",
								lastLogin: new Date(),
								firstLogin: new Date(5, 5, 2020),
							}}
						/>
					}
				/>
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
