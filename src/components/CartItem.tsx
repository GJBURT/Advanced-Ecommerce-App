import React from 'react';

interface Props {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    onRemove: (productId: string) => void;
    onQuantityChange: (productId: string, quantity: number) => void;
}

const CartItem: React.FC<Props> = ({ productId, name, quantity, price, image, onRemove, onQuantityChange }) => {
    return (
        <div className="cart-item">
            <img src={image} alt={name} />

            <div className="cart-details">
                <strong>{name}</strong>
                <p>
                    Quantity:
                    <input
                    className="quantity-input"
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => onQuantityChange?.(productId, Number(e.target.value))}
                    aria-label="Quantity"
                    />
                </p>

                <p>Price: ${price.toFixed(2)}</p>

                <button className="text-button" onClick={() => onRemove(productId)}>
                    Remove
                </button>
            </div>
        </div>
    );

};

export default CartItem;
