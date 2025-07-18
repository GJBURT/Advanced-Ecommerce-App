import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Import Firestore instance
import { AuthContext, type AuthContextType } from '../context/AuthContext';
import { useContext } from 'react';

// UserData interface defines the structure of user data
// It includes properties like uid, email, name, and role
interface UserData {
    uid: string;
    email: string;
    name: string;
    role: string;
}
// useUserData hook retrieves user data from Firestore based on the authenticated user
// It returns an object containing user data and a loading state
export function useUserData() {
    const context = useContext<AuthContextType | null>(AuthContext);
    const user = context?.user;
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserData(userSnap.data() as UserData);
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        };

        fetchUserData();
    }, [user]);

    return { userData, loading };
}