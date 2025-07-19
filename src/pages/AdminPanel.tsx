import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>🛠️ Admin Panel</h2>
            <p>Welcome, Admin! Choose an action:</p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Link to="/admin/products">
                    <button>📦 Manage Products</button>
                </Link>
                <Link to="/admin/orders">
                    <button>📋 View Orders</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;