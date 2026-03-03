'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
    return ctx;
}

export default function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    // Cargar desde localStorage al montar
    useEffect(() => {
        try {
            const stored = localStorage.getItem('cotypack_cart');
            if (stored) setItems(JSON.parse(stored));
        } catch { }
    }, []);

    // Persistir en localStorage
    useEffect(() => {
        localStorage.setItem('cotypack_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product, qty = 1) => {
        setItems(prev => {
            // Generar un ID unico para el carrito combinando id del producto y variante
            const cartId = product.variantName ? `${product.id}-${product.variantName}` : String(product.id);
            const existing = prev.find(i => i.cartId === cartId);

            if (existing) {
                return prev.map(i =>
                    i.cartId === cartId
                        ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
                        : i
                );
            }
            return [...prev, { ...product, cartId, qty: Math.min(qty, product.stock) }];
        });
    };

    const removeFromCart = (cartId) => {
        setItems(prev => prev.filter(i => i.cartId !== cartId));
    };

    const updateQty = (cartId, qty) => {
        if (qty <= 0) {
            removeFromCart(cartId);
            return;
        }
        setItems(prev =>
            prev.map(i => i.cartId === cartId ? { ...i, qty } : i)
        );
    };

    const clearCart = () => setItems([]);

    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, itemCount, total }}>
            {children}
        </CartContext.Provider>
    );
}
