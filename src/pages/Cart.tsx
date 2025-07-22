import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { clearCart, removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';

// Cart component displays the items in the shopping cart
// It allows users to view, remove items, and see the total price and quantity
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    // Calculate total quantity and price of items in the cart
    // totalQuantity is the sum of all item quantities in the cart
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const authContext = useContext(AuthContext);

    const handleCheckout = async () => {
        if (!authContext?.user) {
            alert('Please log in to proceed with checkout.');
            return;
        }

        try {
            const orderRef = collection(db, 'orders');
            await addDoc(orderRef, {
                userId: authContext.user.uid,
                items: cartItems,
                totalQuantity,
                totalPrice,
                createdAt: Timestamp.now(),
            });
            // Clear the cart after successful order placement
            dispatch(clearCart());
            alert('✅ Thank you! Your order has been placed.');
        } catch (error) {
            console.error('❌ Failed to place your order. Please try again:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="cart">
                <div className="cart-top">
                    <Link to="/" className="link-back">
                    ← Continue Shopping
                    </Link>
                </div>

                <h2>🛒 Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map(item => (
                            <CartItem
                                key={item.productId}
                                productId={item.productId}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                                image={item.image}
                                onRemove={(productId) => dispatch(removeFromCart(productId))}
                                onQuantityChange={(productId: string, quantity: number) => dispatch(updateQuantity({ productId, quantity }))}
                            />
                            ))}
                        </ul>

                    <div className="cart-summary">
                        <Link to="/" className="link-back">
                            ← Continue Shopping
                        </Link>
                        <p>Total Items: {totalQuantity}</p>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                    </div>
            )}
            </div>
        </div>
        );

};

    export default Cart;