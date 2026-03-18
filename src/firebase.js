import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTF0ltooJZRlHuSB77fvIDvRovbtX8-H8",
  authDomain: "nones-app-ed274.firebaseapp.com",
  projectId: "nones-app-ed274",
  storageBucket: "nones-app-ed274.firebasestorage.app",
  messagingSenderId: "386948764444",
  appId: "1:386948764444:web:b096d96b089880fea520d9",
  measurementId: "G-G7JM4HJN5E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();