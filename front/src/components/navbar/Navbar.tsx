import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to={"/myhome"}>
					Logo
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link" to={"/login"} >
								Zaloguj
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={"/register"}>
								Zarejestruj
							</Link>
						</li>
						<li className="nav-item d-none">
							<Link className="nav-link" to={"/logout"}>
								Wyloguj
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
