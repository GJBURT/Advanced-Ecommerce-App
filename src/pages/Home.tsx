import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

const fetchProducts = async () => {
    const res = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return res.data;
};

const Home = () => {
    const { data, isLoading, error } = useQuery(['products'], fetchProducts);

    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products.</div>;

    return (
        <div>
            <h2>🛒 Product Catalog</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
                {data?.map(product => (
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
