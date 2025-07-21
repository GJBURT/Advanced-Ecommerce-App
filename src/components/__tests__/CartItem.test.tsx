import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

// Mock data for the CartItem component
const mockItem = {
    productId: 'abc123',
    name: 'Test Product',
    quantity: 2,
    price: 19.99,
    image: 'https://via.placeholder.com/50'
};
// Mock functions for onRemove and onQuantityChange
describe('CartItem Component', () => {
    test('renders item details correctly', () => {
    render(
        <CartItem
            id={mockItem.productId}
            name={mockItem.name}
            quantity={mockItem.quantity}
            price={mockItem.price}
            image={mockItem.image}
            onRemove={() => {}}
            onQuantityChange={() => {}}
        />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Quantity:'))).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByText(/19\.99/)).toBeInTheDocument();
    });

    test('calls onRemove when remove button is clicked', () => {
        const mockRemove = jest.fn();

        render(
        <CartItem
            id={mockItem.productId}
            name={mockItem.name}
            quantity={mockItem.quantity}
            price={mockItem.price}
            image={mockItem.image}
            onRemove={mockRemove}
        />
    );
    // Find the remove button and simulate a click
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(mockItem.productId);
    });
    // Test for quantity change
    test('calls onQuantityChange when quantity is changed', () => {
        const mockChange = jest.fn();

        render(
        <CartItem
            id={mockItem.productId}
            name={mockItem.name}
            quantity={mockItem.quantity}
            price={mockItem.price}
            image={mockItem.image}
            onRemove={() => {}}
            onQuantityChange={mockChange}
        />
        );
        // Find the quantity input and change its value
        const input = screen.getByDisplayValue('2');
        fireEvent.change(input, { target: { value: '3' } });

        expect(mockChange).toHaveBeenCalledTimes(1);
        expect(mockChange).toHaveBeenCalledWith(mockItem.productId, 3);
    });
});
