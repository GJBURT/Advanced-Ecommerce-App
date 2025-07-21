import React from 'react';

interface Props {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    onRemove: (id: string) => void;
    onQuantityChange?: (id: string, quantity: number) => void;
    }

const CartItem: React.FC<Props> = ({ id, name, quantity, price, image, onRemove, onQuantityChange }) => {
    return (
        <div className="cart-item">
        <img src={image} alt={name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
        <strong> {name} </strong> <br />
        Quantity: 
                <input
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => onQuantityChange?.(id, Number(e.target.value))}
                    aria-label="Quantity"
                />
                <br />
        Price: ${price.toFixed(2)} <br />
        <button onClick={() => onRemove(id)}>Remove</button>
        </div>
    );
};

export default CartItem;
