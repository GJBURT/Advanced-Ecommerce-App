import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel'; // Import AdminPanel
import AdminRoute from './components/ProtectedRoute'; // Import ProtectedRoute for admin access


const App: React.FC = () => {

  return (
    <div className="navbar">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
    </div>
  );
};

export default App;
