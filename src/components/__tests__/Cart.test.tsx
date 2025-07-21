import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../features/cart/cartSlice';
import Cart from '../../pages/Cart';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

// Mock cart items
const mockItems = [
    {
        productId: 'abc123',
        name: 'Item 1',
        quantity: 2,
        price: 10.5,
        image: 'https://via.placeholder.com/50',
    },
    {
        productId: 'def456',
        name: 'Item 2',
        quantity: 1,
        price: 20.0,
        image: 'https://via.placeholder.com/50',
    },
];

    type RootState = {
        cart: {
            items: typeof mockItems;
        };
    };

    // Custom mock store
    const createTestStore = () =>
        configureStore({
            reducer: {
            cart: cartReducer,
            },
            preloadedState: {
            cart: { items: mockItems,
            },
        } as RootState,
    });

    describe('Cart Component', () => {
    test('renders cart items from Redux store', () => {
        const store = createTestStore();

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <AuthContext.Provider
                        value={{
                            user: { uid: 'test-user' } as any,
                            loading: false,
                        register: jest.fn(),
                        login: jest.fn(),
                        logout: jest.fn(),
                        role: 'customer',
                        setRole: jest.fn(),
                    }}
                >
                    <Cart />
                </AuthContext.Provider>
            </Provider>
        </MemoryRouter>    
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Total Items: 3')).toBeInTheDocument();
        expect(screen.getByText('Total Price: $41.00')).toBeInTheDocument();
    });
});
