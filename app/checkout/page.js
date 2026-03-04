'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
    const [fieldErrors, setFieldErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        const errors = {};
        // Nombre: mínimo 3 chars, al menos 2 palabras
        if (!form.name.trim() || form.name.trim().length < 3) {
            errors.name = 'Ingresá tu nombre completo.';
        } else if (form.name.trim().split(/\s+/).length < 2) {
            errors.name = 'Ingresá nombre y apellido.';
        }
        // Email: formato válido
        if (!form.email.trim()) {
            errors.email = 'El email es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            errors.email = 'El email no tiene un formato válido.';
        }
        // Teléfono: obligatorio, entre 8 y 15 dígitos
        if (!form.phone.trim()) {
            errors.phone = 'El teléfono es obligatorio.';
        } else {
            const digits = form.phone.replace(/\D/g, '');
            if (digits.length < 8 || digits.length > 15) {
                errors.phone = 'El teléfono debe tener entre 8 y 15 dígitos.';
            }
        }
        return errors;
    };

    const CASH_DISCOUNT_PCT = 5;
    const discount = paymentMethod === 'efectivo' ? Math.round(total * CASH_DISCOUNT_PCT) / 100 : 0;
    const finalTotal = total - discount;

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (items.length === 0) return;
        setLoading(true);
        setError('');

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setLoading(false);
            return;
        }
        setFieldErrors({});

        if (!paymentMethod) {
            setError('Por favor seleccioná un medio de pago.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: form.name,
                    customerEmail: form.email,
                    customerPhone: form.phone,
                    notes: form.notes,
                    paymentMethod,
                    items: items.map(i => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty })),
                    total: finalTotal,
                    discount,
                }),
            });

            if (!res.ok) throw new Error('Error al procesar el pedido');
            const order = await res.json();
            clearCart();
            router.push(`/checkout/success?id=${order.id}&pago=${paymentMethod}&total=${finalTotal}`);
        } catch (err) {
            setError('Ocurrió un error. Por favor intentá de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className={styles.page}>
                <div className="container">
                    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
                        <div style={{ lineHeight: 1, color: 'var(--text-tertiary)' }}>
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </div>
                        <h2>No hay productos en el carrito</h2>
                        <a href="/productos" className="btn btn-primary">Ver catálogo</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <h1 className={styles.title}>Finalizar Pedido</h1>

                <div className={styles.layout}>
                    {/* Formulario */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formSection}>
                            <h2 className={styles.formTitle}>Tus datos</h2>
                            <div className={styles.fields}>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="name">Nombre completo *</label>
                                    <input id="name" className={`input${fieldErrors.name ? ' input-error' : ''}`} name="name" value={form.name} onChange={handleChange} placeholder="Ej: María González" />
                                    {fieldErrors.name && <span className={styles.fieldError}>{fieldErrors.name}</span>}
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="email">Email *</label>
                                    <input id="email" className={`input${fieldErrors.email ? ' input-error' : ''}`} name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" />
                                    {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="phone">Teléfono / WhatsApp *</label>
                                    <input id="phone" className={`input${fieldErrors.phone ? ' input-error' : ''}`} name="phone" value={form.phone} onChange={handleChange} placeholder="+54 11 1234-5678" />
                                    {fieldErrors.phone && <span className={styles.fieldError}>{fieldErrors.phone}</span>}
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="notes">Notas adicionales</label>
                                    <textarea id="notes" className="textarea" name="notes" value={form.notes} onChange={handleChange} placeholder="Domicilio de entrega, aclaraciones, etc." />
                                </div>
                            </div>
                        </div>

                        <div className={styles.paymentSection}>
                            <h2 className={styles.formTitle}>Medio de pago</h2>
                            <div className={styles.paymentOptions}>
                                <button
                                    type="button"
                                    className={`${styles.paymentOption} ${paymentMethod === 'mercadopago' ? styles.paymentOptionActive : ''}`}
                                    onClick={() => setPaymentMethod('mercadopago')}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><path d="M20 12h-4a2 2 0 0 0 0 4h4"/></svg>
                                    <div>
                                        <div className={styles.paymentOptionTitle}>MercadoPago</div>
                                        <div className={styles.paymentOptionSub}>Transferencia / QR / Link de pago</div>
                                    </div>
                                    {paymentMethod === 'mercadopago' && (
                                        <svg className={styles.paymentCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.paymentOption} ${paymentMethod === 'efectivo' ? styles.paymentOptionActive : ''}`}
                                    onClick={() => setPaymentMethod('efectivo')}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                                    <div>
                                        <div className={styles.paymentOptionTitle}>Efectivo <span className={styles.cashBadge}>5% OFF</span></div>
                                        <div className={styles.paymentOptionSub}>Al retirar en el local</div>
                                    </div>
                                    {paymentMethod === 'efectivo' && (
                                        <svg className={styles.paymentCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && <div className={styles.errorMsg}>{error}</div>}

                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                            {loading ? (
                                <><div className="spinner" />&nbsp; Procesando...</>
                            ) : (
                                `Confirmar pedido — ${formatPrice(finalTotal)}`
                            )}
                        </button>
                    </form>

                    {/* Resumen */}
                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Tu pedido</h2>
                        {items.map(item => (
                            <div key={item.id} className={styles.summaryItem}>
                                <div className={styles.summaryItemInfo}>
                                    <span className={styles.summaryItemName}>{item.name}</span>
                                    <span className={styles.summaryItemQty}>× {item.qty}</span>
                                </div>
                                <span>{formatPrice(item.price * item.qty)}</span>
                            </div>
                        ))}
                        {discount > 0 && (
                            <div className={styles.summaryRow}>
                                <span style={{ color: 'var(--success, #16a34a)' }}>Descuento efectivo (5%)</span>
                                <span style={{ color: 'var(--success, #16a34a)', fontWeight: 700 }}>−{formatPrice(discount)}</span>
                            </div>
                        )}
                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span className={styles.totalPrice}>{formatPrice(finalTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
