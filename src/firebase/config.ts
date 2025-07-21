import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for the Advanced E-commerce App
// This configuration is used to initialize Firebase services in the application
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase with the provided configuration
export const app = initializeApp(firebaseConfig);

// Export the initialized Firebase Auth and Firestore instances
export const auth = getAuth(app);

// Export the Firestore instance for database operations
export const db = getFirestore(app);