import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { clearCart, removeFromCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
// Cart component displays the items in the shopping cart
// It allows users to view, remove items, and see the total price and quantity
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    // Calculate total quantity and price of items in the cart
    // totalQuantity is the sum of all item quantities in the cart
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div style={{ marginBottom: '1rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                    ← Continue Shopping
                </Link>
            </div>
            <div className="cart">
                <h2>🛒Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                    <strong> {item.title} </strong> <br />
                                    Quantity: {item.quantity} <br />
                                    Price: ${item.price.toFixed(2)} <br />
                                    <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                                </div>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <div style={{ marginBottom: '1rem' }}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                                    ← Continue Shopping
                                </Link>
                            </div>
                            <p>Total Items: {totalQuantity}</p>
                            <p>Total Price: ${totalPrice.toFixed(2)}</p>
                            <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }} onClick={() => {
                                dispatch(clearCart());
                                alert('✅ Thank you! Your order has been placed.');
                            } }>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            </>
    );
};

    export default Cart;