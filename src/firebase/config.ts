import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import getFirebaseConfig from './getFirebaseConfig';

// Initialize Firebase with the provided configuration
export const app = initializeApp(getFirebaseConfig());

// Export the initialized Firebase Auth and Firestore instances
export const auth = getAuth(app);

// Export the Firestore instance for database operations
export const db = getFirestore(app);