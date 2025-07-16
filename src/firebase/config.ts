import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase configuration for the Advanced E-commerce App
// This configuration is used to initialize Firebase services in the application
// In real world production applications with sensitive data such as API keys would be stored securely using a .env file or similar method
// However, for portfolio project purposes, I am directly including it here.
const firebaseConfig = {
    apiKey: "AIzaSyB8F7X63eGUvpKMwkBIDHS8zW7qKuNqKu4",
    authDomain: "advanced-ecommerce-app-9663a.firebaseapp.com",
    projectId: "advanced-ecommerce-app-9663a",
    storageBucket: "advanced-ecommerce-app-9663a.appspot.com",
    messagingSenderId: "880241815482",
    appId: "1:880241815482:web:56b10b01cd519165a2b783"
};
// Initialize Firebase with the provided configuration
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);