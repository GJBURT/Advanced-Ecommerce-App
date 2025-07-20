import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Profile component allows users to view and edit their profile information
// It retrieves user data from Firestore and allows editing of name and address
const Profile: React.FC = () => {
    const user = auth.currentUser;
    const navigate = useNavigate();
    // State to manage profile data and editing state
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    // Fetch user profile data from Firestore
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfileData({
                    name: data.name || '',
                    email: data.email || user.email || '',
                    address: data.address || ''
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
        if (!user) return;
        const confirm = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, 'users', user.uid));
            await deleteUser(user);
            navigate('/'); // Redirect home or login
        } catch {
            alert('Failed to delete account. You may need to reauthenticate.');
        }
    };

    if (loading) return <p>Loading...</p>;
    // Render profile form with editable fields for name and address
    // Email is displayed but not editable
    return (
        <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
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
            <button onClick={handleDeleteAccount} style={{ marginTop: '1rem', color: 'red' }}>
                Delete Account
            </button>
        </div>
    );
};

export default Profile;