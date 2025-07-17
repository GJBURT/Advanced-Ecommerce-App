import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import type { RootState } from '../redux/store';

const Header: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const { user } = useContext(AuthContext);

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h1>🛍️ Advanced E-Commerce App</h1>
            <nav>
                {user ? (
                <>
                    <Link to="/">Home </Link>
                    <Link to="/orders">My Orders </Link>
                    <Link to="/cart">
                        🛒 Cart ({totalCount})
                    </Link>
                    <LogoutButton />
                </>
                ) : (
                <>
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/register">Register</Link>
                </>
                )}
            </nav>
        </header>
    );
};

export default Header;