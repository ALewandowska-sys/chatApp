import React from "react";
import "../logout/Logout.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigate = useNavigate();

	const logout = async () => {
		await signOut(auth);
		navigate("/");
	};

	return (
		<div className="logout">
			<button className="logoutBtn" onClick={logout}>
				Wyloguj się
			</button>
		</div>
	);
}
