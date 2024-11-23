// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRwUlAtUkt4Pgm5rOnh1mT4DV2GFCjb3U",
  authDomain: "appgsenergy.firebaseapp.com",
  projectId: "appgsenergy",
  storageBucket: "appgsenergy.firebasestorage.app",
  messagingSenderId: "653979869060",
  appId: "1:653979869060:web:d6d043003a1944db4e07d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Export as named and default
export { db, auth }; // Exportações nomeadas
export default app;  // Exportação padrão
