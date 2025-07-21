import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '../../features/cart/cartSlice';
import Cart from '../../pages/Cart';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import type { User } from 'firebase/auth';

describe('Cart Integration Test', () => {
    test('displays item after adding to cart', () => {
        const store = configureStore({
            reducer: { cart: cartReducer },
            preloadedState: { cart: { items: [] } },
        });

        store.dispatch(addToCart({
            productId: 'ghi789',
            name: 'Test Product',
            quantity: 1,
            price: 25.00,
            image: 'https://via.placeholder.com/50',
        }));

        // Mock a Firebase User
        const mockUser = {
            uid: 'test-user',
            email: 'test@example.com',
            emailVerified: true,
            isAnonymous: false,
            metadata: {} as any,
            providerData: [],
            refreshToken: '',
            tenantId: null,
            displayName: 'Test User',
            phoneNumber: null,
            photoURL: null,
            providerId: '',
            reload: jest.fn(),
            getIdToken: jest.fn(),
            getIdTokenResult: jest.fn(),
            toJSON: jest.fn(),
            delete: jest.fn(),
        } as User;

        // Mock the full AuthContextType
        const mockAuthContextValue = {
            user: mockUser,
            loading: false,
            register: jest.fn(),
            login: jest.fn(),
            logout: jest.fn(),
            role: 'customer',
            setRole: jest.fn(),
        };

        render(
        <MemoryRouter>
            <Provider store={store}>
                <AuthContext.Provider value={mockAuthContextValue}>
                    <Cart />
                </AuthContext.Provider>
            </Provider>
        </MemoryRouter>
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Total Items: 1')).toBeInTheDocument();
        expect(screen.getByText('Total Price: $25.00')).toBeInTheDocument();
    });
});
