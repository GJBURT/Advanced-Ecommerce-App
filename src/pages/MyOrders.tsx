import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Order {
    id: string;
    items: {
        name: string;
        quantity: number;
        price: number;
        image: string;
    }[];
    totalQuantity: number;
    totalPrice: number;
    createdAt: any; // Firestore Timestamp
}

const MyOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            setUser(currentUser);

            const q = query(
                collection(db, 'orders'),
                where('userId', '==', currentUser.uid),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const fetchedOrders = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Order[];

            setOrders(fetchedOrders);
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return () => unsubscribe();
}, []);


    return (
        <div style={{ padding: '2rem' }}>
        <h2>🛒 My Orders</h2>
        {loading ? (
            <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
            <p>You have not placed any orders yet.</p>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Total Quantity:</strong> {order.totalQuantity}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p><strong>Created At:</strong> {order.createdAt?.toDate().toLocaleString() || 'Unknown'}</p>

                <details style={{ marginTop: '1rem' }}>
                    <summary>View Items</summary>
                    {!Array.isArray(order.items) || order.items.length === 0 ? (
                    <p>No items in this order.</p>
                    ) : (
                    <ul>
                        {order.items.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                            <p>Name: {item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                        </li>
                        ))}
                    </ul>
                    )}
                </details>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default MyOrders;
