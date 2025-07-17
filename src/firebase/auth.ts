import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./config";

const auth = getAuth(app);
const db = getFirestore(app);
// Register new user and create a Firestore user document
export const register = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const user = userCredential.user;
    // Create a Firestore document for the user
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        role: "customer", // Default role
        createdAt: new Date(),
    });

    return userCredential;
};
    
// Login
export const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = () => signOut(auth);