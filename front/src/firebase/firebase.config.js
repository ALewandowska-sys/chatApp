import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAxzNXj2ZagyUnd5XtnIDNN8Qcuf63Sojc",
	authDomain: "epuls-958cf.firebaseapp.com",
	projectId: "epuls-958cf",
	storageBucket: "epuls-958cf.appspot.com",
	messagingSenderId: "37670071177",
	appId: "1:37670071177:web:6dd632b77401abef2ccf58",
	measurementId: "G-2QBEYTTT0C",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
