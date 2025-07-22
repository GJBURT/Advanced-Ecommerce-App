import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { loginUser } from '../firebase/auth';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await loginUser(email, password);
            navigate('/'); // Redirect to home page after successful login
        } catch (err) {
            const errorMessage = err instanceof FirebaseError ? err.message : 'Login failed';
            setError(errorMessage);
        }
    };
// This component provides a form for users to log in
// It uses the loginUser function from the Firebase auth module to authenticate users
    return (
        <div className="container">
            <div className="auth-form">
                <h2 className="auth-header">Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;