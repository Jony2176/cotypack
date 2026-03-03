import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './page.module.css';

/* SVG Icons — Lucide, no emojis (skill: ui-ux-pro-max) */
const IconBox = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);
const IconTag = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
);
const IconCart = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);
const IconClock = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);
const IconAlert = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);
const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const STATUS_ICONS = {
    pendiente: <IconClock />,
    pagado: <IconCheck />,
    enviado: <IconCart />,
    entregado: <IconBox />,
    cancelado: <IconAlert />,
};
const STATUS_LABELS = {
    pendiente: 'Pendiente',
    pagado: 'Pagado',
    enviado: 'Enviado',
    entregado: 'Entregado',
    cancelado: 'Cancelado',
};

export default async function AdminDashboard() {
    const [totalProducts, totalCategories, totalOrders, recentOrders, lowStock] = await Promise.all([
        prisma.product.count({ where: { active: true } }),
        prisma.category.count(),
        prisma.order.count(),
        prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
        prisma.product.findMany({ where: { stock: { lte: 5 }, active: true }, take: 5, orderBy: { stock: 'asc' } }),
    ]);

    const pendingOrders = await prisma.order.count({ where: { status: 'pendiente' } });

    const stats = [
        { label: 'Productos activos', value: totalProducts, Icon: IconBox, href: '/admin/productos', color: '#4F46E5' },
        { label: 'Categorías', value: totalCategories, Icon: IconTag, href: '/admin/categorias', color: '#A855F7' },
        { label: 'Pedidos totales', value: totalOrders, Icon: IconCart, href: '/admin/pedidos', color: '#10B981' },
        { label: 'Pedidos pendientes', value: pendingOrders, Icon: IconClock, href: '/admin/pedidos?status=pendiente', color: '#F59E0B' },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <div className={styles.quickActions}>
                    <Link href="/admin/productos/nuevo" className="btn btn-primary">+ Nuevo producto</Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
                {stats.map(({ label, value, Icon, href, color }) => (
                    <Link key={label} href={href} className={styles.statCard} style={{ '--stat-color': color }}>
                        <div className={styles.statIcon}><Icon /></div>
                        <div>
                            <div className={styles.statValue}>{value}</div>
                            <div className={styles.statLabel}>{label}</div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className={styles.grid2}>
                {/* Pedidos recientes */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Pedidos recientes</h2>
                        <Link href="/admin/pedidos" className={styles.seeAll}>Ver todos →</Link>
                    </div>
                    {recentOrders.length === 0 ? (
                        <div className={styles.empty}>Sin pedidos aún</div>
                    ) : (
                        <div className={styles.table}>
                            {recentOrders.map(o => (
                                <div key={o.id} className={styles.tableRow}>
                                    <div>
                                        <div className={styles.orderName}>{o.customerName}</div>
                                        <div className={styles.orderEmail}>{o.customerEmail}</div>
                                    </div>
                                    <div className={styles.orderInfo}>
                                        <span className={styles.orderStatus}>
                                            {STATUS_ICONS[o.status]}
                                            {STATUS_LABELS[o.status] || o.status}
                                        </span>
                                        <span className={styles.orderTotal}>${o.total.toLocaleString('es-AR')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stock bajo */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconAlert /> Stock bajo
                        </h2>
                        <Link href="/admin/productos" className={styles.seeAll}>Ver todos →</Link>
                    </div>
                    {lowStock.length === 0 ? (
                        <div className={styles.empty} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconCheck /> Todo el stock está bien
                        </div>
                    ) : (
                        <div className={styles.table}>
                            {lowStock.map(p => (
                                <div key={p.id} className={styles.tableRow}>
                                    <span className={styles.productName}>{p.name}</span>
                                    <span className={`${styles.stockBadge} ${p.stock === 0 ? styles.stockZero : ''}`}>
                                        {p.stock === 0 ? 'Sin stock' : `${p.stock} und.`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
