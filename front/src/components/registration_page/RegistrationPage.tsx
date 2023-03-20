import "./RegistrationPage.scss";
import { useForm } from "react-hook-form";

export default function RegistrationPage() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
			password2: "",
		},
	});

	const errorStyles = {
		color: "grey",
	};

	return (
		<div className="wrapper">
			<div className="form-wrapper">
				<h2>Zarejestruj się</h2>
				<form
					onSubmit={handleSubmit((data) => {
						console.log(data);
					})}
				>
					<div>
						<input
							{...register("username", {
								required: "Podaj nazwę użytkownika",
								minLength: { value: 5, message: "Minimalna ilość znaków: 5" },
							})}
							placeholder="Nazwa użytkownika"
							type="text"
						/>
						<p style={errorStyles}>{errors.username?.message}</p>
					</div>
					<div>
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
						/>
						<p style={errorStyles}>{errors.email?.message}</p>
					</div>
					<div>
						<input
							{...register("password", {
								required: "Podaj hasło",
								pattern: {
									value:
										/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8}$/,
									message:
										"Hasło powinno zawierać co najmniej 8 znaków oraz: 1 dużą literę, 1 małą, 1 cyfrę i 1 znak specjalny",
								},
							})}
							placeholder="Hasło"
							type="password"
						/>
						<p style={errorStyles}>{errors.password?.message}</p>
					</div>
					<div>
						<input
							{...register("password2", {
								required: "Powtórz hasło",
								validate: (value: string) => {
									if (watch("password") != value) {
										return "Hasła nie są takie same";
									}
								},
							})}
							placeholder="Powtórz hasło"
							type="password"
						/>
						<p style={errorStyles}>{errors.password2?.message}</p>
					</div>
					<div>
						<button>Utwórz konto</button>
					</div>
				</form>
			</div>
		</div>
	);
}
