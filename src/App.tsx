import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel'; // Import AdminPanel
import AdminRoute from './components/ProtectedRoute'; // Import ProtectedRoute for admin access
import AdminProducts from './pages/AdminProducts'; // Import AdminProducts
import AdminOrders from './pages/AdminOrders'; // Import AdminOrders
import AdminProductForm from './pages/AdminProductForm'; // Import AdminProductForm
import Profile from './pages/Profile'; // Import Profile page
import MyOrders from './pages/MyOrders'; // Import MyOrders page


const App: React.FC = () => {

  return (
    <div className="navbar">
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-orders" element={<MyOrders />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/products/new" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
        <Route path="/admin/products/edit/:id" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
      </Routes>
    </div>
  );
};

export default App;
