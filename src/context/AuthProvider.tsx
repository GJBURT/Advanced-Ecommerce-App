import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { AuthContext, type AuthContextType } from './AuthContext';
import { auth } from '../firebase/config'; // Import Firebase auth instance
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Import Firestore instance

// AuthProvider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string>('customer'); // Default role
    const [loading, setLoading] = useState(true);
    
    // useEffect to listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                // Fetch user role from Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role || 'customer'); // Set role from Firestore
                }
            } else {
                setRole('customer'); // Reset to default role if not logged in
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateRole = async (newRole: string) => {
        if (!user) return;
        await updateDoc(doc(db, 'users', user.uid), { role: newRole });
        setRole(newRole); // Update local state
    };

    const register = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const value: AuthContextType = {
        user,
        loading,
        register,
        login,
        logout,
        role,
        setRole: updateRole, // Use the updateRole function to set a new role
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};