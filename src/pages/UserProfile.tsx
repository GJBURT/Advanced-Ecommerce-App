import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';

const UserProfile: React.FC = () => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user) {
                return;
            }
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name || '');
                setAddress(data.address || '');
            }
        };

        fetchUserProfile();
    }, [user]);

    const handleUpdate = async () => {
        if (!user) {
            return;
        }
        await updateDoc(doc(db, "users", user.uid), {
            name,
            address
        });
        alert('Profile updated successfully!');
    };

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button onClick={handleUpdate}>Update Profile</button>
        </div>
    );
};

export default UserProfile;