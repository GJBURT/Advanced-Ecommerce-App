import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

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

const fetchCategories = async () => {
    const res = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
    return res.data;
};

const fetchProductByCategory = async (category: string) => {
    const url = category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${category}`;
    const res = await axios.get<Product[]>(url);
    return res.data;
};

{/* const fetchProducts = async () => {
    const res = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return res.data;
}; */}

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
