import React from 'react';

const AdminPanel: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>🛠️ Admin Panel</h2>
            <p>Welcome, Admin! Choose an action:</p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button>📦 Manage Products</button>
                <button>📋 View Orders</button>
            </div>
        </div>
    );
};

export default AdminPanel;