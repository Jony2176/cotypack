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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (items.length === 0) return;
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: form.name,
                    customerEmail: form.email,
                    customerPhone: form.phone,
                    notes: form.notes,
                    items: items.map(i => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty })),
                    total,
                }),
            });

            if (!res.ok) throw new Error('Error al procesar el pedido');
            const order = await res.json();
            clearCart();
            router.push(`/checkout/success?id=${order.id}`);
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
                        <div style={{ fontSize: '3rem' }}>🛒</div>
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
                                    <input id="name" className="input" name="name" value={form.name} onChange={handleChange} required placeholder="Ej: María González" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="email">Email *</label>
                                    <input id="email" className="input" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="phone">Teléfono / WhatsApp</label>
                                    <input id="phone" className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="+54 11 1234-5678" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="notes">Notas adicionales</label>
                                    <textarea id="notes" className="textarea" name="notes" value={form.notes} onChange={handleChange} placeholder="Domicilio de entrega, aclaraciones, etc." />
                                </div>
                            </div>
                        </div>

                        <div className={styles.paymentNotice}>
                            <div className={styles.paymentIcon}>💳</div>
                            <div>
                                <strong>Coordinación de pago</strong>
                                <p>Una vez enviado el pedido nos pondremos en contacto para coordinar el pago y la entrega.</p>
                            </div>
                        </div>

                        {error && <div className={styles.errorMsg}>{error}</div>}

                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                            {loading ? (
                                <><div className="spinner" />&nbsp; Procesando...</>
                            ) : (
                                `Confirmar pedido — ${formatPrice(total)}`
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
                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span className={styles.totalPrice}>{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
