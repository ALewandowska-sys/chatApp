import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
	apiKey: "AIzaSyCnExrDRvrCiX2L6vhSFyPetZDNtOMQDto",
	authDomain: "chatapp-777ae.firebaseapp.com",
	projectId: "chatapp-777ae",
	storageBucket: "chatapp-777ae.appspot.com",
	messagingSenderId: "622893953491",
	appId: "1:622893953491:web:ce62b29e3639f1d0c8ff26",
	measurementId: "G-40YC5N43SH"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
