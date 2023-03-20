import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");


	return (
		<form>
			<div className="inputsContainer">
				<input
					type="email"
					placeholder="E-mail"
					value={email}
					autoFocus
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Hasło"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<Link className="navbar-login" to={"/mainpage"}>
				Zaloguj się
			</Link>
		</form>
	);
}
