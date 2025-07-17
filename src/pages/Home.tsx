import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addToCart } from '../features/cart/cartSlice';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
// Update the import path or ensure useAuthContext is exported from AuthProvider
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

// Product interface defines the structure of a product object
// It includes properties like id, name, price, category, description, image
interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
}
// fetchProducts retrieves all products from the Firestore database
// It returns an array of Product objects
const fetchProducts = async (category: string) => {
    const productsRef = collection(db, 'products');

    const q = category == 'all'
        ? productsRef
        : query(productsRef, where('category', '==', category));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Product[];
}
// fetchProductByCategory retrieves products filtered by category
// It returns an array of Product objects based on the selected category
const fetchCategories = async (): Promise<string[]> => {
    const snapshot = await getDocs(collection(db, 'products'));
    const allProducts = snapshot.docs.map(doc => doc.data() as Product);
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
    return uniqueCategories;
}

// Home component displays the product catalog
// It allows users to filter products by category and add items to the shopping cart
function Home() {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const loading = authContext?.loading;
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const dispatch = useDispatch<AppDispatch>();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => fetchProducts(selectedCategory)
    });

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [user, loading, navigate]);

    if (loading) return <p>Loading...</p>; // Wait for auth state to load
    if (!user) return null; // Don't render anything if user is not authenticated

    return (
        <main>
            <div>
                <h2>🛒 Product Catalog</h2>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor='category-select'>Filter by category: </label>
                    <select
                        id='category-select'
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value='all'>All</option>
                        {categories?.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {isLoading && <p>Loading products...</p>}
                {error && <p>Error loading products: {String(error)}</p>}
                { !products?.length && <p>No products found in this category.</p>}

                <div className="product-grid">
                    {products?.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>${product.price ? product.price.toFixed(2) : 'N/A'}</strong></p>
                            <button
                                onClick={() => dispatch(addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    quantity: 1
                                }))
                            }
                            >Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Home;