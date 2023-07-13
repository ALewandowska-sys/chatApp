import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

import "./Login.scss";

export default function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const errorStyles = {
		color: "#fefefe",
	};

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			);
			navigate("/myhome");
		} catch (error) {
			setErrorMessage("Użytkownik nie istnieje");
			alert(errorMessage);
		}
	};

	return (
		<form
			onSubmit={handleSubmit((data, e) => {
				e?.preventDefault();
			})}
			className="formLogin"
		>
			<div className="formLogin__inputs">
				<div className="formLogin__inputs--input">
					<input
						{...register("email", {
							required: "Podaj e-mail",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Zły format",
							},
						})}
						placeholder="E-mail"
						type="email"
						className="email"
						onChange={(e) => {
							setLoginEmail(e.target.value);
						}}
					/>
					{errors.email && <p style={errorStyles}>{errors.email?.message}</p>}
				</div>
				<div className="formLogin__inputs--input">
					<input
						{...register("password", {
							required: "Podaj hasło",
						})}
						type="password"
						placeholder="Hasło"
						className="password"
						onChange={(e) => {
							setLoginPassword(e.target.value);
						}}
					/>
					{errors.password && (
						<p style={errorStyles}>{errors.password?.message}</p>
					)}
				</div>
			</div>
			<button type="submit" className="formLogin__btn" onClick={login}>
				Zaloguj się
			</button>

		</form>
	);
}
