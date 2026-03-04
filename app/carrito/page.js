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
                        <div className={styles.emptyIcon}>
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </div>
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
                                    {/* Imagen */}
                                    <div className={styles.itemImage}>
                                        {mainImage ? (
                                            <Image src={mainImage} alt={item.name} fill sizes="100px" className={styles.itemImg} />
                                        ) : (
                                            <div className={styles.itemImgPlaceholder}>
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                            </div>
                                        )}
                                    </div>
                                    {/* Info + controles (columna derecha) */}
                                    <div className={styles.itemBody}>
                                        <div className={styles.itemTopRow}>
                                            <div className={styles.itemInfo}>
                                                <h3 className={styles.itemName}>
                                                    {item.name}
                                                    {item.variantName && <span style={{ display: 'block', fontSize: '0.85em', color: 'var(--text-tertiary)', marginTop: '2px' }}>Medida: {item.variantName}</span>}
                                                </h3>
                                                <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                                            </div>
                                            <button className={styles.removeBtn} onClick={() => removeFromCart(item.cartId)} aria-label="Eliminar">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className={styles.itemBottomRow}>
                                            <div className={styles.itemQty}>
                                                <button className={styles.qtyBtn} onClick={() => updateQty(item.cartId, item.qty - 1)}>−</button>
                                                <span className={styles.qtyVal}>{item.qty}</span>
                                                <button className={styles.qtyBtn} onClick={() => updateQty(item.cartId, item.qty + 1)} disabled={item.qty >= item.stock}>+</button>
                                            </div>
                                            <div className={styles.itemTotal}>{formatPrice(item.price * item.qty)}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className={styles.cartActions}>
                            <button className="btn btn-ghost" onClick={clearCart}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight:'6px'}}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                Vaciar carrito
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
