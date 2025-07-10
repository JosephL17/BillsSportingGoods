import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const  [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        setCartItems(prevItems => {
            return [...prevItems, { ...product }];
        });
    };

    const removeFromCart = (productId) =>  {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    }

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price, 0
    );

    const cartCount = cartItems.length;

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotal,
            cartCount,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);