import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9AL5Vrbzo_Iwo_pZXAd9cpDdsK6uI8Gg",
    authDomain: "taskmaster-6f226.firebaseapp.com",
    projectId: "taskmaster-6f226",
    storageBucket: "taskmaster-6f226.appspot.com",
    messagingSenderId: "297752027452",
    appId: "1:297752027452:web:9ecd24d5ff090b7188be39",
    measurementId: "G-YZHCGBZD3X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };