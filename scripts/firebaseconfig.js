import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAN8FBQI7HUm9Rk9RdjmkVrjtiQCaUnD1A",
    authDomain: "signup-4e3aa.firebaseapp.com",
    projectId: "signup-4e3aa",
    storageBucket: "signup-4e3aa.firebasestorage.app",
    messagingSenderId: "838261594832",
    appId: "1:838261594832:web:7e82564d2bfd6f8cd01cd5",
    measurementId: "G-48QJY1WVVG"
};

export const app = initializeApp(firebaseConfig);
// console.log(app);

export const auth = getAuth(app)
// console.log(auth);
auth.languageCode = 'en';
export const db = getFirestore(app);
// console.log(db);
