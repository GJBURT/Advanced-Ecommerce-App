import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Import Firestore instance
import { v4 as uuidv4 } from 'uuid';

type Product = {
    name: string;
    price: string;
    category: string;
    image: string;
    description: string;
    seeded: boolean;
};

const AdminProductForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>(); // Get product ID from URL params
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
        seeded: false,
    });
    const isEditing = !!id; // Check if we are editing an existing product

    useEffect(() => {
        const fetchProduct = async () => {
            if (isEditing && id) {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProduct({
                        ...data,
                        price: String(data.price ?? ''), // Ensure price is a string for input
                        category: String(data.category ?? ''),
                        image: String(data.image ?? ''),
                        description: String(data.description ?? ''),
                        name: String(data.name ?? ''),
                        seeded: false
                    });
                } else {
                    console.error('Product not found');
                }
            }
        };

        fetchProduct();
    }, [id, isEditing]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing && id) {
                // Update existing product
                await updateDoc(doc(db, 'products', id), {
                    ...product,
                    price: parseFloat(product.price),
                });
            }
            else {
                // Create new product
                const newProductId = uuidv4(); // Generate a unique ID for the new product
                await setDoc(doc(db, 'products', newProductId), {
                    ...product,
                    price: parseFloat(product.price),
                    seeded: false, // New products are not seeded by default
                });
            }

            navigate('/admin/products'); // Redirect to the product list after saving
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    

    return (
        <div className="page-container">
            <h2>{isEditing ? '📝 Admin Product Form' : '➕ Add New Product'}</h2>
            
            <form onSubmit={handleSubmit} className="product-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={String(product.name)}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={String(product.price)}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={String(product.category)}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={String(product.image)}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={String(product.description)}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
            </form>
        </div>
    );
};

export default AdminProductForm;
