'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.css';

export default function AdminProductosPage() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [buscar, setBuscar] = useState('');
    const [loading, setLoading] = useState(true);
    const LIMIT = 20;

    const load = async () => {
        setLoading(true);
        const q = new URLSearchParams({ page, limit: LIMIT, admin: 'true' });
        if (buscar) q.set('buscar', buscar);
        const res = await fetch(`/api/productos?${q}`);
        const data = await res.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setLoading(false);
    };

    useEffect(() => { load(); }, [page, buscar]);

    const handleToggleActive = async (id, current) => {
        await fetch(`/api/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active: !current }),
        });
        load();
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
        await fetch(`/api/productos/${id}`, { method: 'DELETE' });
        load();
    };

    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Productos</h1>
                    <p className={styles.sub}>{total} productos en total</p>
                </div>
                <Link href="/admin/productos/nuevo" className="btn btn-primary">+ Nuevo producto</Link>
            </div>

            {/* Búsqueda */}
            <div className={styles.toolbar}>
                <input
                    className={`input ${styles.search}`}
                    placeholder="Buscar producto..."
                    value={buscar}
                    onChange={e => { setBuscar(e.target.value); setPage(1); }}
                />
            </div>

            {/* Tabla */}
            {loading ? (
                <div className={styles.loading}>Cargando...</div>
            ) : (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className={!p.active ? styles.rowInactive : ''}>
                                    <td>
                                        <div className={styles.productName}>{p.name}</div>
                                        <div className={styles.productSlug}>{p.slug}</div>
                                    </td>
                                    <td className={styles.cell}>{p.category?.name || '—'}</td>
                                    <td className={styles.cell}>
                                        <div className={styles.priceCell}>{formatPrice(p.price)}</div>
                                        {p.comparePrice && <div className={styles.comparePrice}>{formatPrice(p.comparePrice)}</div>}
                                    </td>
                                    <td className={styles.cell}>
                                        <span className={`${styles.stockBadge} ${p.stock === 0 ? styles.stockZero : p.stock <= 5 ? styles.stockLow : ''}`}>
                                            {p.stock}
                                        </span>
                                    </td>
                                    <td className={styles.cell}>
                                        <button
                                            className={`${styles.toggleBtn} ${p.active ? styles.toggleActive : styles.toggleInactive}`}
                                            onClick={() => handleToggleActive(p.id, p.active)}
                                        >
                                            {p.active ? '✓ Activo' : '✗ Inactivo'}
                                        </button>
                                    </td>
                                    <td className={styles.cell}>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/productos/${p.id}`} className={styles.editBtn}>Editar</Link>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(p.id, p.name)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {products.length === 0 && (
                        <div className={styles.empty}>No se encontraron productos</div>
                    )}

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
