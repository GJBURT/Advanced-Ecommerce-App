import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Import Firestore instance
import { Link } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    seeded: boolean; // Indicates if the product is a seeded demo product
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
        const productDocRef = doc(db, 'products', id);
        const productSnap = await getDoc(productDocRef);
        if (!productSnap.exists()) return;
        // Check if the product is a seeded demo product
        // If it is, alert the user and do not delete
        const product = productSnap.data();
        if (product.seeded) {
            alert('This is a seeded demo product and cannot be deleted.');
            return;
        }
        // Confirm deletion
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        // Delete product from Firestore
        await deleteDoc(productDocRef);
        fetchProducts(); // Refresh the product list
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="manage-products page-container">
            <h2>📦 Manage Products</h2>

            <Link to="/admin/products/new">
                <button className="add-button">Add New Product</button>
            </Link>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Actions</th>
                        <th>Demo</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.category}</td>
                            <td>
                                <img src={product.image} alt={product.name} style={{ width: '50px' }} />
                            </td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`/admin/products/edit/${product.id}`}>
                                    <button className="text-button">Edit</button>
                                </Link>
                                <button className="text-button" onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                            <td>{product.seeded && <span className="seeded-label">(Seeded)</span>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
