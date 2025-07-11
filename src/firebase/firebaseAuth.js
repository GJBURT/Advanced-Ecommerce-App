import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);
// Sign up and create user in Firestore
export const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        role: "customer", // Default role
        createdAt: new Date(),
    });
};

// Login
export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = () => signOut(auth);