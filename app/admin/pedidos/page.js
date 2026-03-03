'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.css';

const STATUS_OPTIONS = [
    { value: 'pendiente', label: '⏳ Pendiente', color: '#F59E0B' },
    { value: 'pagado', label: '✅ Pagado', color: '#10B981' },
    { value: 'enviado', label: '🚚 Enviado', color: '#3B82F6' },
    { value: 'entregado', label: '📦 Entregado', color: '#6C3CE1' },
    { value: 'cancelado', label: '❌ Cancelado', color: '#EF4444' },
];
const STATUS_MAP = Object.fromEntries(STATUS_OPTIONS.map(s => [s.value, s]));

export default function AdminPedidosPage() {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('');
    const [expanded, setExpanded] = useState(null);
    const [loading, setLoading] = useState(true);
    const LIMIT = 20;

    const load = async () => {
        setLoading(true);
        const q = new URLSearchParams({ page, limit: LIMIT });
        if (filterStatus) q.set('status', filterStatus);
        const res = await fetch(`/api/pedidos?${q}`);
        const data = await res.json();
        setOrders(data.orders || []);
        setTotal(data.total || 0);
        setLoading(false);
    };

    useEffect(() => { load(); }, [page, filterStatus]);

    const handleStatusChange = async (orderId, newStatus) => {
        await fetch(`/api/pedidos/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        load();
    };

    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Pedidos</h1>
                    <p className={styles.sub}>{total} pedidos en total</p>
                </div>
                <div className={styles.filters}>
                    <select className="select" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }} style={{ width: '200px' }}>
                        <option value="">Todos los estados</option>
                        {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>Cargando...</div>
            ) : (
                <div className={styles.list}>
                    {orders.length === 0 ? (
                        <div className={styles.empty}>No hay pedidos que mostrar</div>
                    ) : orders.map(order => {
                        const items = JSON.parse(order.items || '[]');
                        const st = STATUS_MAP[order.status] || { label: order.status, color: '#6B7280' };
                        const isOpen = expanded === order.id;
                        return (
                            <div key={order.id} className={styles.orderCard}>
                                <div className={styles.orderHeader} onClick={() => setExpanded(isOpen ? null : order.id)}>
                                    <div className={styles.orderLeft}>
                                        <span className={styles.orderId}>#{order.id}</span>
                                        <div>
                                            <div className={styles.customerName}>{order.customerName}</div>
                                            <div className={styles.customerEmail}>{order.customerEmail}</div>
                                        </div>
                                    </div>
                                    <div className={styles.orderRight}>
                                        <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('es-AR')}</span>
                                        <span className={styles.orderTotal}>{formatPrice(order.total)}</span>
                                        <span className={styles.statusBadge} style={{ color: st.color, background: `${st.color}18` }}>{st.label}</span>
                                        <span className={styles.chevron} style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                                    </div>
                                </div>

                                {isOpen && (
                                    <div className={styles.orderDetail}>
                                        <div className={styles.detailGrid}>
                                            <div>
                                                <h4 className={styles.detailTitle}>Items del pedido</h4>
                                                {items.map((item, i) => (
                                                    <div key={i} className={styles.itemRow}>
                                                        <span>{item.name} × {item.qty}</span>
                                                        <span>{formatPrice(item.price * item.qty)}</span>
                                                    </div>
                                                ))}
                                                <div className={`${styles.itemRow} ${styles.itemTotal}`}>
                                                    <span>Total</span>
                                                    <span>{formatPrice(order.total)}</span>
                                                </div>
                                                {order.notes && (
                                                    <div className={styles.notes}>
                                                        <strong>Notas:</strong> {order.notes}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className={styles.detailTitle}>Cliente</h4>
                                                <div className={styles.customerDetails}>
                                                    <p><strong>Nombre:</strong> {order.customerName}</p>
                                                    <p><strong>Email:</strong> {order.customerEmail}</p>
                                                    {order.customerPhone && <p><strong>Teléfono:</strong> {order.customerPhone}</p>}
                                                </div>
                                                <h4 className={styles.detailTitle} style={{ marginTop: '16px' }}>Cambiar estado</h4>
                                                <div className={styles.statusBtns}>
                                                    {STATUS_OPTIONS.map(s => (
                                                        <button
                                                            key={s.value}
                                                            className={`${styles.statusBtn} ${order.status === s.value ? styles.statusBtnActive : ''}`}
                                                            style={{ '--s-color': s.color }}
                                                            onClick={() => handleStatusChange(order.id, s.value)}
                                                        >
                                                            {s.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Anterior</button>
                            <span className={styles.pageInfo}>Página {page} de {totalPages}</span>
                            <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Siguiente →</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
