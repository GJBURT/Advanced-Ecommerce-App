import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
    return (
        <div className="admin-container">
            <h2>🛠️ Admin Panel</h2>
            <p>Welcome, Admin! Choose an action:</p>

            <div className="admin-actions">
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