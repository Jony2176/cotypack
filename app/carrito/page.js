'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
import { formatPrice, parseImages } from '@/lib/utils';
import styles from './page.module.css';

export default function CarritoPage() {
    const { items, removeFromCart, updateQty, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>🛒</div>
                        <h2>Tu carrito está vacío</h2>
                        <p className="text-muted">Agregá productos desde el catálogo para comenzar.</p>
                        <Link href="/productos" className="btn btn-primary" style={{ marginTop: '24px' }}>
                            Ver catálogo
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <h1 className={styles.title}>Mi Carrito</h1>

                <div className={styles.layout}>
                    {/* Items */}
                    <div className={styles.items}>
                        {items.map(item => {
                            const images = parseImages(item.images);
                            const mainImage = images[0] || null;
                            return (
                                <div key={item.cartId} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        {mainImage ? (
                                            <Image src={mainImage} alt={item.name} fill sizes="100px" className={styles.itemImg} />
                                        ) : (
                                            <div className={styles.itemImgPlaceholder}>🎉</div>
                                        )}
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemName}>
                                            {item.name}
                                            {item.variantName && <span style={{ display: 'block', fontSize: '0.85em', color: 'var(--text-tertiary)', marginTop: '4px' }}>Medida/Presentación: {item.variantName}</span>}
                                        </h3>
                                        <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                                    </div>
                                    <div className={styles.itemQty}>
                                        <button className={styles.qtyBtn} onClick={() => updateQty(item.cartId, item.qty - 1)}>−</button>
                                        <span className={styles.qtyVal}>{item.qty}</span>
                                        <button className={styles.qtyBtn} onClick={() => updateQty(item.cartId, item.qty + 1)} disabled={item.qty >= item.stock}>+</button>
                                    </div>
                                    <div className={styles.itemTotal}>{formatPrice(item.price * item.qty)}</div>
                                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.cartId)} aria-label="Eliminar">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}

                        <div className={styles.cartActions}>
                            <button className="btn btn-ghost" onClick={clearCart}>
                                🗑️ Vaciar carrito
                            </button>
                            <Link href="/productos" className="btn btn-ghost">
                                ← Seguir comprando
                            </Link>
                        </div>
                    </div>

                    {/* Resumen */}
                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Resumen del pedido</h2>
                        <div className={styles.summaryRows}>
                            {items.map(item => (
                                <div key={item.cartId} className={styles.summaryRow}>
                                    <span>{item.name} {item.variantName ? `(${item.variantName})` : ''} × {item.qty}</span>
                                    <span>{formatPrice(item.price * item.qty)}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span className={styles.totalPrice}>{formatPrice(total)}</span>
                        </div>
                        <p className={styles.summaryNote}>
                            Los gastos de envío se calculan durante el checkout.
                        </p>
                        <Link href="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                            Finalizar pedido →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
