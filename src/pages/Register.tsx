import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { register } from '../firebase/auth'; // Import the register function

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    // Handle registration form submission
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await register(email, password, name);
            navigate('/'); // Redirect to home page after successful registration
        } catch (err) {
            const errorMessage = err instanceof FirebaseError ? err.message : 'Registration failed';
            setError(errorMessage);
        }
    };
    // This component provides a form for users to register
    // It uses the register function from the Firebase auth module to create a new user
    return (
        <div className="container">
            <div className="auth-form">
                <h2 className="auth-header">Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;