import React from "react";
import RegistrationPage from "../registration_page/RegistrationPage";
import "./LandingPage.scss";

export default function LandingPage() {
	return (
		<div>
			<div className="landingPage">
				<header>
					<h1>Epuls</h1>
					<p className="landingPage-p">Stwórz swoją własną sieć kontaktów i podziel się przeżyciami</p>
					<img
						src="https://pixabay.com/get/gd411c2d13fc2e3ea29dd15d5b09a7cc1c641f7fd1e10d6701a9df4859bb324adb19375758ecd9423c8ddc6ddc9bfd46f4ebf033bd2eba25cd8d957928f01f491d2a8471d39a758be08ad46d9ed445767_1280.png"
						alt="epuls site logo"
					/>
				</header>
				<main>
				<RegistrationPage />
				</main>
			</div>
		</div>
	);
}
