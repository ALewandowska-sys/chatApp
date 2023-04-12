import RegistrationPage from "../../components/registration/RegistrationPage";
import "./LandingPage.scss";
import logoIMG from "../../assets/connections-g7cb911d89_1280.png";

export default function LandingPage() {
	return (
		<div>
			<div className="landingPage">
				<header>
					<h1>Epuls</h1>
					<p className="landingPage-p">
						Stwórz swoją własną sieć kontaktów i podziel się przeżyciami
					</p>
					<img src={logoIMG} alt="Epuls site logo" />
				</header>
				<main className="landingPageWrapper">
					<div className="formWrapper">
						<h2>Zarejestruj się</h2>
						<RegistrationPage />
					</div>
				</main>
			</div>
		</div>
	);
}
