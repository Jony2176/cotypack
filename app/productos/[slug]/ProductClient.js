'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { formatPrice, parseVariants } from '@/lib/utils';
import styles from './page.module.css';
import AddToCartStyles from './AddToCart.module.css';

export default function ProductClient({ product, images, displayPrice, hasDiscount, discountPct, hasVariants }) {
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const variants = useMemo(() => parseVariants(product.variants), [product.variants]);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const currentStock = hasVariants
        ? (selectedVariant ? selectedVariant.stock : 0)
        : product.stock;

    const currentPrice = hasVariants
        ? (selectedVariant ? selectedVariant.price : 0)
        : product.price;

    const isOutOfStock = currentStock === 0;
    const canAdd = !isOutOfStock && (!hasVariants || selectedVariant);

    const handleAdd = () => {
        if (!canAdd) return;

        const productForCart = hasVariants
            ? { ...product, variantName: selectedVariant.name, price: currentPrice, stock: currentStock }
            : product;

        addToCart(productForCart, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        setQty(1);
    };

    const handleVariantSelect = (v) => {
        setSelectedVariant(v);
        setQty(1);
        
        // Try to find matching image
        if (images.length > 1) {
            // Find keyword from variant name (e.g. "15x20 cm" -> "15x20")
            const keyword = v.name.replace(/\s*cm\s*/i, '').toLowerCase().trim();
            const foundIdx = images.findIndex(img => img.toLowerCase().includes(keyword));
            if (foundIdx !== -1) {
                setActiveImage(foundIdx);
            }
        }
    };

    return (
        <div className={styles.product}>
            {/* Galería */}
            <div className={styles.gallery}>
                <div className={styles.mainImage}>
                    {images.length > 0 ? (
                        <Image
                            src={images[activeImage] || images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.img}
                            priority
                        />
                    ) : (
                        <div className={styles.imgPlaceholder}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        </div>
                    )}
                    {hasDiscount && (
                        <div className={styles.discountBadge}>-{discountPct}%</div>
                    )}
                </div>
                {images.length > 1 && (
                    <div className={styles.thumbs}>
                        {images.map((img, i) => (
                            <div 
                                key={i} 
                                className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                                onClick={() => setActiveImage(i)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Image src={img} alt={`${product.name} - imagen ${i + 1}`} fill className={styles.thumbImg} sizes="100px" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className={styles.info}>
                {product.category && (
                    <Link href={`/productos?categoria=${product.category.slug}`} className={styles.categoryLink}>
                        {product.category.name}
                    </Link>
                )}
                <h1 className={styles.name}>{product.name}</h1>

                {/* Precio */}
                <div className={styles.pricing}>
                    <span className={styles.price}>
                        {hasVariants && !selectedVariant && displayPrice.isRange && <span style={{ fontSize: '0.6em', opacity: 0.8, marginRight: '8px', fontWeight: '500' }}>Desde</span>}
                        {formatPrice(hasVariants && selectedVariant ? currentPrice : displayPrice.minPrice)}
                    </span>
                    {hasDiscount && (
                        <>
                            <span className={styles.comparePrice}>{formatPrice(product.comparePrice)}</span>
                            <span className="badge-error" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--error)', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700 }}>
                                -{discountPct}% OFF
                            </span>
                        </>
                    )}
                </div>

                {/* Stock Global (solo si no hay variantes) */}
                {!hasVariants && (
                    <div className={styles.stock}>
                        {product.stock === 0 ? (
                            <span className={styles.stockOut}>✗ Sin stock</span>
                        ) : product.stock <= 5 ? (
                            <span className={styles.stockLow}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}} aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>¡Solo quedan {product.stock} unidades!</span>
                        ) : (
                            <span className={styles.stockOk}>✓ En stock ({product.stock} disponibles)</span>
                        )}
                    </div>
                )}

                {/* Descripción */}
                {product.description && (() => {
                    const parts = product.description.split('•').map(s => s.trim()).filter(Boolean);
                    const mainText = parts[0];
                    const bullets = parts.slice(1);
                    return (
                        <div className={styles.description}>
                            <h3 className={styles.descTitle}>Descripción</h3>
                            {mainText && <p className={styles.descText}>{mainText}</p>}
                            {bullets.length > 0 && (
                                <ul className={styles.descBullets}>
                                    {bullets.map((b, i) => (
                                        <li key={i} className={styles.descBulletItem}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })()}

                {/* ======== ADD TO CART COMPONENTS INLINED ======== */}
                <div className={AddToCartStyles.wrapper}>
                    {/* Selector de variantes si existen */}
                    {hasVariants && (() => {
                        const allSamePrice = variants.every(v => v.price === variants[0].price);
                        return (
                            <div className={AddToCartStyles.variants}>
                                <span className={AddToCartStyles.variantsLabel}>Presentación / Medida:</span>
                                <div className={AddToCartStyles.variantsGrid}>
                                    {variants.map((v, i) => {
                                        const noStock = Number(v.stock) === 0;
                                        const isActive = selectedVariant && selectedVariant.name === v.name;
                                        return (
                                            <button
                                                key={i}
                                                className={`${AddToCartStyles.variantBtn} ${isActive ? AddToCartStyles.variantBtnActive : ''} ${noStock ? AddToCartStyles.variantBtnDisabled : ''}`}
                                                onClick={() => handleVariantSelect(v)}
                                                disabled={noStock}
                                                type="button"
                                            >
                                                <span>{v.name}</span>
                                                {!allSamePrice && <span className={AddToCartStyles.variantPrice}>{formatPrice(v.price)}</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })()}

                    {/* Selector de cantidad y stock global/variante */}
                    {(canAdd || (hasVariants && !selectedVariant)) && (
                        <div className={AddToCartStyles.qtyRow}>
                            <span className={AddToCartStyles.qtyLabel}>Cantidad:</span>
                            {canAdd ? (
                                <div className={AddToCartStyles.qtyControl}>
                                    <button
                                        className={AddToCartStyles.qtyBtn}
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        disabled={qty <= 1}
                                    >−</button>
                                    <span className={AddToCartStyles.qtyValue}>{qty}</span>
                                    <button
                                        className={AddToCartStyles.qtyBtn}
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
                        className={`btn btn-primary btn-lg ${AddToCartStyles.addBtn} ${added ? AddToCartStyles.addBtnSuccess : ''}`}
                        onClick={handleAdd}
                        disabled={!canAdd && ((hasVariants && selectedVariant) || !hasVariants)}
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
                {/* ================================================= */}

                {/* Beneficios */}
                <div className={styles.perks}>
                    <div className={styles.perk}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                        Retiro por el local
                    </div>
                    <div className={styles.perk}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        Pagá con MercadoPago o Efectivo
                    </div>
                    <div className={styles.perk}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        Consultá por ventas mayoristas
                    </div>
                </div>
            </div>
        </div>
    );
}
