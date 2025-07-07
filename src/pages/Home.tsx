import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addToCart } from '../features/cart/cartSlice';
// Product interface defines the structure of a product object
// It includes properties like id, title, price, category, description, image, and rating
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
// fetchCategories retrieves the list of product categories from the API
// It returns an array of category strings
const fetchCategories = async () => {
    const res = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
    return res.data;
};
// fetchProductByCategory retrieves products based on the selected category
// If the category is 'all', it fetches all products; otherwise, it fetches products from the specified category
// It returns an array of Product objects
const fetchProductByCategory = async (category: string) => {
    const url = category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${category}`;
    const res = await axios.get<Product[]>(url);
    return res.data;
};
// Home component displays the product catalog
// It allows users to filter products by category and add items to the shopping cart
const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const dispatch = useDispatch<AppDispatch>();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => fetchProductByCategory(selectedCategory)
    });

    return (
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
            {error && <p>Error loading products.</p>}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
                {products?.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem'}}>
                        <img src={product.image} alt={product.title} style={{width: '100px', height: '100px', objectFit: 'contain' }} />
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p><strong>${product.price}</strong></p>
                        <p>Rating: {product.rating.rate} ⭐</p>
                        <button
                            onClick={() => dispatch(addToCart({
                                id: product.id,
                                title: product.title,
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
    );
};

export default Home;
