'use client';

import { useState, useMemo } from 'react';
import { useCart } from '@/components/CartProvider';
import { formatPrice, parseVariants } from '@/lib/utils';
import styles from './AddToCart.module.css';

export default function AddToCart({ product }) {
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    // Parse variants
    const variants = useMemo(() => parseVariants(product.variants), [product.variants]);
    const hasVariants = variants.length > 0;

    // Si hay variantes, no hay stock ni precio global (depende de la variante)
    const [selectedVariant, setSelectedVariant] = useState(null);

    // Calcular stock y precio actual
    const currentStock = hasVariants
        ? (selectedVariant ? selectedVariant.stock : 0)
        : product.stock;

    const currentPrice = hasVariants
        ? (selectedVariant ? selectedVariant.price : 0)
        : product.price;

    const isOutOfStock = currentStock === 0;
    // Si tiene variantes y no se seleccionó ninguna, el botón debe pedir que se seleccione
    const canAdd = !isOutOfStock && (!hasVariants || selectedVariant);

    const handleAdd = () => {
        if (!canAdd) return;

        // Armar el producto que va al carrito sumando la variante si existe
        const productForCart = hasVariants
            ? { ...product, variantName: selectedVariant.name, price: currentPrice, stock: currentStock }
            : product;

        addToCart(productForCart, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        setQty(1);
    };

    return (
        <div className={styles.wrapper}>
            {/* Selector de variantes si existen */}
            {hasVariants && (
                <div className={styles.variants}>
                    <span className={styles.variantsLabel}>Presentación / Medida:</span>
                    <div className={styles.variantsGrid}>
                        {variants.map((v, i) => {
                            const noStock = Number(v.stock) === 0;
                            const isActive = selectedVariant && selectedVariant.name === v.name;
                            return (
                                <button
                                    key={i}
                                    className={`${styles.variantBtn} ${isActive ? styles.variantBtnActive : ''} ${noStock ? styles.variantBtnDisabled : ''}`}
                                    onClick={() => {
                                        setSelectedVariant(v);
                                        setQty(1); // Reset cantidad al cambiar variante
                                    }}
                                    disabled={noStock}
                                    type="button"
                                >
                                    <span>{v.name}</span>
                                    <span className={styles.variantPrice}>{formatPrice(v.price)}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Selector de cantidad y stock global/variante */}
            {(canAdd || (hasVariants && !selectedVariant)) && (
                <div className={styles.qtyRow}>
                    <span className={styles.qtyLabel}>Cantidad:</span>
                    {canAdd ? (
                        <div className={styles.qtyControl}>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQty(q => Math.max(1, q - 1))}
                                disabled={qty <= 1}
                            >−</button>
                            <span className={styles.qtyValue}>{qty}</span>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQty(q => Math.min(currentStock, q + 1))}
                                disabled={qty >= currentStock}
                            >+</button>
                        </div>
                    ) : (
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Seleccioná una opción...</span>
                    )}
                </div>
            )}

            {/* Botón de agregar */}
            <button
                className={`btn btn-primary btn-lg ${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
                onClick={handleAdd}
                disabled={!canAdd && (hasVariants && selectedVariant || !hasVariants)}
            >
                {added
                    ? '✓ Agregado al carrito'
                    : hasVariants && !selectedVariant
                        ? 'Elegir una opción'
                        : isOutOfStock
                            ? 'Sin stock'
                            : `Agregar al carrito — ${formatPrice(currentPrice * qty)}`}
            </button>
        </div>
    );
}
