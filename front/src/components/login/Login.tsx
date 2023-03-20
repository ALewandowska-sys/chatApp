import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

export default function Login() {
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

	const navigate = useNavigate();

	const errorStyles = {
		color: "#fefefe",
	};

	return (
		
		<form
			onSubmit={handleSubmit((data, e) => {
				e?.preventDefault();
				console.log(data);
				navigate("/mainpage");
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
					/>
					<p style={errorStyles}>{errors.email?.message}</p>
				</div>
				<div className="formLogin__inputs--input">
					<input
						{...register("password", {
							required: "Podaj hasło",
						})}
						type="password"
						placeholder="Hasło"
						className="password"
					/>
					<p style={errorStyles}>{errors.password?.message}</p>
				</div>
			</div>
			<button type="submit" className="formLogin__btn">
				Zaloguj się
			</button>
		</form>
	);
}
