import { Link } from "react-router-dom";
import "./Navbar.scss";
import Login from "../../login/Login";

export default function Navbar() {
	return (
		<nav>
			<Link className="navbar-logo" to={"/myhome"}>
				Logo
			</Link>
			<Login />
		</nav>
	);
}
