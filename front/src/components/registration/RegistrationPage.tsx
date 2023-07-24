import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase/firebase.config";
import "./RegistrationPage.scss";
import { addDoc, collection } from "firebase/firestore";

export default function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

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

  const addUsernameToCollection = async (username: string, userId: string) => {
    try {
      const usernameCollectionRef = collection(firestore, "Usernames");
      const newUsername = {
        username,
        userId,
      };
      await addDoc(usernameCollectionRef, newUsername);
      console.log("Nazwa użytkownika została zapisana w kolekcji 'Usernames'");
    } catch (error) {
      console.log("Błąd podczas zapisywania nazwy użytkownika:", error);
    }
  };

  const registration = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user, "auth with mail and password");

      // Zapisz nazwę użytkownika w kolekcji "Usernames" po utworzeniu konta
      addUsernameToCollection(username, user.user.uid);

      navigate("/myhome");
    } catch (error: any) {
      console.log(error.message);
    }
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
              onChange={(e) => {
                setUsername(e.target.value); // Ustawienie nazwy użytkownika na podstawie wprowadzonej wartości
              }}
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
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setRegisterPassword(e.target.value);
              }}
            />
            <p style={errorStyles}>{errors.password?.message}</p>
          </div>
          <div>
            <input
              {...register("password2", {
                required: "Powtórz hasło",
                validate: (value: string) => {
                  if (watch("password") !== value) {
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
            <button onClick={registration}>Utwórz konto</button>
          </div>
        </form>
      </div>
    </div>
  );
}
