import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

// Profile component allows users to view and edit their profile information
// It retrieves user data from Firestore and allows editing of name and address
const Profile: React.FC = () => {
    const user = auth.currentUser;
    // State to manage profile data and editing state
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        address: '',
        role: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    // Fetch user profile data from Firestore
    useEffect(() => {
        const fetchProfile = async () => {
            if (!auth.currentUser) return;

            const docRef = doc(db, 'users', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfileData({
                    name: data.name || '',
                    email: data.email || auth.currentUser.email || '',
                    address: data.address || '',
                    role: data.role || 'customer' // Default to 'customer' if no role is set
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user]);
    // Handle input changes for profile fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };
    // Handle saving profile changes
    const handleSave = async () => {
        if (!user) return;
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
            name: profileData.name,
            address: profileData.address
        });
        setEditing(false);
    };
    
    // Handle account deletion
    const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;

    const confirmed = window.confirm(
        'Are you sure you want to delete your account? This will permanently remove your profile and all associated orders.'
    );
    if (!confirmed) return;

    const user = auth.currentUser;

    try {
        const userId = user.uid;

        // Delete orders
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', userId));
        const orderSnapshots = await getDocs(q);
        const deletePromises = orderSnapshots.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // Delete user document
        await deleteDoc(doc(db, 'users', userId));

        // Try deleting user account
        try {
            await deleteUser(user);
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                // Reauthenticate
                const password = prompt("Please re-enter your password to confirm account deletion:");
                if (!password) throw new Error("Password is required for reauthentication.");

                const credential = EmailAuthProvider.credential(user.email || '', password);
                await reauthenticateWithCredential(user, credential);
                await deleteUser(user);
            } else {
                throw error;
            }
        }

        alert('Your account and all associated data have been deleted.');
        window.location.href = '/register';

    } catch (error: any) {
        console.error('Error deleting account:', error);
        alert(error.message || 'Failed to delete account. Please try again.');
    }
};

    // If loading, show a loading message
    if (loading) return <p>Loading...</p>;
    // Render profile form with editable fields for name and address
    // Email is displayed but not editable
    return (
        <div className="page-container">
            <h2>👤 User Profile</h2>
            <label>
                Name:
                <input
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!editing}
                />
            </label>
            <br />
            <label>
                Email:
                <input name="email" value={profileData.email} disabled />
            </label>
            <br />
            <label>
                Address:
                <input
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!editing}
                />
            </label>
            <br />
            {editing ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={() => setEditing(true)}>Edit</button>
            )}
            <br />
            {profileData.role === 'customer' && (
                <button
                    onClick={handleDeleteAccount}
                    style={{
                        marginTop: '2rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'crimson',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Delete Account
                </button>
            )}

        </div>
    );
};

export default Profile;