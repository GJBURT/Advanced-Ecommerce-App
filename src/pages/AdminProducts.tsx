import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Import Firestore instance
import { Link } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        const snapshot = await getDocs(collection(db, 'products'));
        const productsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Product[];
        setProducts(productsList);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        // Delete product from Firestore
        await deleteDoc(doc(db, 'products', id));
        fetchProducts(); // Refresh the product list
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>📦 Manage Products</h2>
            <Link to="/admin/products/new">
                <button style={{ marginBottom: '1rem' }}>Add New Product</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`/admin/products/edit/${product.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
