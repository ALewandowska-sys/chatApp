import { Link } from "react-router-dom";
import Logout from "../../logout/Logout";
import "./NavbarUser.scss";

export default function NavbarUser() {
	return (
		<nav className="navbarUser">
			<Link className="navbar-logo" to={"/myhome"}>
				<img
					src="../../../assets/connections-g7cb911d89_1280.png"
					alt="Epuls site logo"
					className="navbarUser-logo"
				/>
			</Link>
			<Logout />
		</nav>
	);
}
