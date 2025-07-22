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

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {

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
            setLoading(false);
        }
    });

    return () => unsubscribe();
}, []);


    return (
        <div className="page-container">
            <h2>🛒 My Orders</h2>
            {loading ? (
                <p>Loading your orders...</p>
            ) : orders.length === 0 ? (
                <p>You have not placed any orders yet.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Total Quantity:</strong> {order.totalQuantity}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                            <p><strong>Created At:</strong> {order.createdAt?.toDate().toLocaleString() || 'Unknown'}</p>

                            <details className="order-details">
                                <summary>View Items</summary>
                                {!Array.isArray(order.items) || order.items.length === 0 ? (
                                <p>No items in this order.</p>
                                ) : (
                                <ul className="order-items">
                                    {order.items.map((item, index) => (
                                    <li key={index}>
                                        <img src={item.image} alt={item.name} className="order-item-img" />
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
