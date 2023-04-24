import React from "react";
import { Link } from "react-router-dom";
import Login from "../../login_form/Login";
import "./Navbar.scss";
import ThemeSwitcher from "../../theme_switcher/ThemeSwitcher";




export default function Navbar(): JSX.Element {


  return (
    <nav className="navbar">
      <Link className="navbar-logo" to={"/myhome"}>
        Logo
      </Link>

      <Login />

    <ThemeSwitcher/>
    </nav>

  );
}
