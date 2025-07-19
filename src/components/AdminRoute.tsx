import React, { useState, useEffect, type JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Import Firestore instance

interface AdminRouteProps {
    children: JSX.Element;
}
// AdminRoute component checks if the user is logged in and has an admin role
// If the user is not logged in, it redirects to the login page
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const loading = authContext?.loading;
    const [role, setRole] = useState<string | null>(null);
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const checkUserRole = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setRole(userData.role);
                }
            }
            setCheckingRole(false);
        };

        checkUserRole();
    }, [user]);
    if (loading || checkingRole) {
        return <div>Loading...</div>;
    }
    // If user is not logged in redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }
    // If user is logged in but not an admin, redirect to home
    if (role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;