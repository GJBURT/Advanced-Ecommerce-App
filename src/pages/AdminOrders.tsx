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
        <div className="page-container">
            <h2>📋 View Orders</h2>

            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => {
                        console.log("Order ID:", order.id, "Order Items:", order.items, "Type of items:", typeof order.items);

                        return (
                            <div key={order.id} className="order-card">
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>User ID:</strong> {order.userId}</p>
                                <p><strong>Customer Name:</strong> {order.customerName ?? 'Unknown User'}</p>
                                <p><strong>Total Quantity:</strong> {order.totalQuantity}</p>
                                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                                <p><strong>Created At:</strong>{' '}
                                    {(order.createdAt instanceof Date
                                    ? order.createdAt
                                    : (order.createdAt as any)?.toDate?.()
                                    )?.toLocaleString() || 'Unknown'}
                                </p>


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
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
