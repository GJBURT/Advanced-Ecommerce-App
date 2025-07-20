import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config'; // Import Firestore instance

interface Order {
    id: string;
    userId: string;
    customerName?: string; // Optional field to hold the customer's name
    items: { 
        productId: string;
        name: string; 
        quantity: number; 
        price: number;
        image: string;
    }[];
    totalQuantity: number;
    totalPrice: number;
    createdAt: Date;
}

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try { 
                const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const fetchedOrders = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Order[];
                console.log("Fetched Orders:", fetchedOrders);
                const enrichedOrders: Order[] = [];
                for (const order of fetchedOrders) {
                    let customerName = 'Unknown User';
                    try {
                        const userDoc = await getDoc(doc(db, 'users', order.userId));
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            customerName = userData.name || userData.email || 'Unknown User';
                        }
                    } catch (err) {
                        console.warn("Failed to fetch user info for order:", order.id, err);
                    }
                    enrichedOrders.push({ ...order, customerName });
                }
                setOrders(enrichedOrders);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>📋 View Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {orders.map(order => {
                        console.log("Order ID:", order.id, "Order Items:", order.items, "Type of items:", typeof order.items);

                        return (
                            <div key={order.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>User ID:</strong> {order.userId}</p>
                                <p><strong>Customer Name:</strong> {order.customerName ?? 'Unknown User'}</p>
                                <p><strong>Total Quantity:</strong> {order.totalQuantity}</p>
                                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                                <p><strong>Created At:</strong>{' '}
                                    {order.createdAt instanceof Date
                                        ? order.createdAt.toLocaleString()
                                        : order.createdAt?.toDate?.().toLocaleString() || 'Unknown'}
                                </p>


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
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
