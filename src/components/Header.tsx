import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import type { RootState } from '../redux/store';

const Header: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const role = authContext?.role;
    const setRole = authContext?.setRole;
    
    const location = useLocation();
    const isRegisterPage = location.pathname === '/register';
    const isLoginPage = location.pathname === '/login';

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h1>🛍️ Advanced E-Commerce App</h1>
            <nav>
                {user ? (
                <>
                    <label htmlFor="role-select">Role: </label>
                    <select
                        id="role-select"
                        value={role}
                        onChange={(e) => setRole && setRole(e.target.value)}
                        style={{ marginLeft: '0.5rem' }}
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                    <Link to="/">Home </Link>
                    <Link to="/orders">My Orders </Link>
                    { role === 'admin' && <Link to="/admin">Admin Panel</Link>}
                    <Link to="/cart">
                        🛒 Cart ({totalCount})
                    </Link>
                    <LogoutButton />
                </>
                ) : (
                <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {isRegisterPage && <p>Already have an account? <Link to="/login">Login</Link></p>}
                    {isLoginPage && <p>Don't have an account? <Link to="/register">Register</Link></p>}
                </div>
                </>
                )}
            </nav>
        </header>
    );
};

export default Header;