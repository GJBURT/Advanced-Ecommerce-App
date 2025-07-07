import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>🛒Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                                <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                <strong> {item.title} </strong> <br />
                                Quantity: {item.quantity} <br/>
                                Price: ${item.price.toFixed(2)} <br />
                                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p>Total Items: {totalQuantity}</p>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

    export default Cart;