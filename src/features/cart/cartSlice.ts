import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// CartItem defines the structure of an item in the cart
// It includes properties like id, name, price, image, and quantity
interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}
// CartState defines the structure of the cart state
// It contains an array of CartItem objects
interface CartState {
    items: CartItem[];
}
// loadCartFromSession retrieves the cart items from session storage
// If no items are found, it returns an empty array
const loadCartFromSession = (): CartItem[] => {
    const saved = sessionStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
};
// initialState defines the initial state of the cart
// It loads the cart items from session storage to ensure persistence across page reloads
const initialState: CartState = {
    items: loadCartFromSession(),
};
// Save cart items to session storage whenever the cart is updated
// This ensures that the cart state is always in sync with the session storage
const saveCartToSession = (cart: CartItem[]) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
};
// Create a Redux slice for the cart
// This slice contains the initial state, reducers for adding, removing, and clearing items in the
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            console.log("🛒 Adding to cart:", action.payload);
            const existing = state.items.find(item => item.productId === action.payload.productId);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            saveCartToSession(state.items); // Save the updated cart to session storage
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
                saveCartToSession(state.items);
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
            saveCartToSession(state.items); // Save the updated cart to session storage
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToSession(state.items); // Save the updated cart to session storage
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;