import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
	return (
		<nav>
			<Link className="navbar-logo" to={"/myhome"}>
				Logo
			</Link>
			<Link className="navbar-login" to={"/login"}>
				Zaloguj się
			</Link>
		</nav>
	);
}
