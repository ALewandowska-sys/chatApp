import React from "react";
import RegistrationPage from "../registration_page/RegistrationPage";
import Navbar from "../navbar/Navbar";
import "./LandingPage.scss";

export default function LandingPage() {
	return (
		<div>
			<Navbar />
			<div className="landingPage">
				<header>
					<h1>Epuls</h1>
					<p className="landingPage-p">
						Stwórz swoją własną sieć kontaktów i podziel się przeżyciami
					</p>
					<img
						src="assets/connections-g7cb911d89_1280.png"
						alt="Epuls site logo"
					/>
				</header>
				<main>
					<RegistrationPage />
				</main>
			</div>
		</div>
	);
}
