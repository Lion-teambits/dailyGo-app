import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_API_KEY } from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "dailygo-teamlion.firebaseapp.com",
  projectId: "dailygo-teamlion",
  storageBucket: "dailygo-teamlion.appspot.com",
  messagingSenderId: "599608469381",
  appId: "1:599608469381:web:3da21be00b2a24b55c46ec",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
