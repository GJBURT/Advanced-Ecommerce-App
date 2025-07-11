import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  // Retrieve cart items from the Redux store
  // Calculate the total count of items in the cart
  // This is done by summing the quantity of each item in the cart
  // The totalCount is then displayed in the cart link
  // This ensures that the cart link always reflects the current number of items in the cart
  // This is useful for users to see how many items they have added to their cart at a glance
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1>🛍️ Advanced E-Commerce App</h1>
        <Link to="/cart">
          🛒 Cart ({totalCount})
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
