import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: 'Catálogo de Productos',
    description: 'Explorá toda nuestra variedad de artículos de cotillón y papelería: pelucas, bolsas, vajilla descartable, decoración y mucho más.',
};

export default async function ProductosPage({ searchParams }) {
    const params = await searchParams;
    const page = Math.max(1, parseInt(params.page || '1'));
    const categoria = params.categoria || '';
    const buscar = params.buscar || '';
    const orden = params.orden || 'nombre_asc';
    const LIMIT = 24;

    const where = { active: true };
    if (categoria) where.category = { slug: categoria };
    if (buscar) {
        where.OR = [
            { name: { contains: buscar } },
            { description: { contains: buscar } },
        ];
    }

    const orderMap = {
        'nombre_asc': { name: 'asc' },
        'nombre_desc': { name: 'desc' },
        'precio_asc': { price: 'asc' },
        'precio_desc': { price: 'desc' },
        'recientes': { createdAt: 'desc' },
    };
    const orderBy = orderMap[orden] || { name: 'asc' };

    const [products, total, categories] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy,
            skip: (page - 1) * LIMIT,
            take: LIMIT,
            include: { category: { select: { name: true, slug: true } } },
        }),
        prisma.product.count({ where }),
        prisma.category.findMany({ orderBy: { displayOrder: 'asc' } }),
    ]);

    const totalPages = Math.ceil(total / LIMIT);

    function buildUrl(overrides) {
        const p = { page: '1', categoria, buscar, orden, ...overrides };
        const q = new URLSearchParams();
        if (p.page && p.page !== '1') q.set('page', p.page);
        if (p.categoria) q.set('categoria', p.categoria);
        if (p.buscar) q.set('buscar', p.buscar);
        if (p.orden && p.orden !== 'nombre_asc') q.set('orden', p.orden);
        const qs = q.toString();
        return `/productos${qs ? `?${qs}` : ''}`;
    }

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            {buscar ? `Resultados para "${buscar}"` : categoria ? getCatName(categories, categoria) : 'Todos los Productos'}
                        </h1>
                        <p className={styles.count}>
                            {total === 0 ? 'Sin resultados' : `${total} producto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                </div>

                <div className={styles.layout}>
                    {/* Sidebar filtros */}
                    <aside className={styles.sidebar}>
                        {/* Búsqueda */}
                        <div className={styles.filterSection}>
                            <h3 className={styles.filterTitle}>Buscar</h3>
                            <form action="/productos" method="GET">
                                {categoria && <input type="hidden" name="categoria" value={categoria} />}
                                {orden !== 'nombre_asc' && <input type="hidden" name="orden" value={orden} />}
                                <div className={styles.searchBox}>
                                    <input
                                        className="input"
                                        type="text"
                                        name="buscar"
                                        defaultValue={buscar}
                                        placeholder="Buscar productos..."
                                    />
                                    <button type="submit" className={styles.searchBtn}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Categorías */}
                        <div className={styles.filterSection}>
                            <h3 className={styles.filterTitle}>Categorías</h3>
                            <ul className={styles.catList}>
                                <li>
                                    <Link
                                        href={buildUrl({ categoria: '', page: '1' })}
                                        className={`${styles.catItem} ${!categoria ? styles.catItemActive : ''}`}
                                    >
                                        <span>🎉 Todas</span>
                                        <span className={styles.catCount}>{total}</span>
                                    </Link>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.id}>
                                        <Link
                                            href={buildUrl({ categoria: cat.slug, page: '1' })}
                                            className={`${styles.catItem} ${categoria === cat.slug ? styles.catItemActive : ''}`}
                                        >
                                            <span>{cat.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ordenar */}
                        <div className={styles.filterSection}>
                            <h3 className={styles.filterTitle}>Ordenar por</h3>
                            <ul className={styles.ordenList}>
                                {[
                                    { v: 'nombre_asc', l: 'Nombre A-Z' },
                                    { v: 'nombre_desc', l: 'Nombre Z-A' },
                                    { v: 'precio_asc', l: 'Menor precio' },
                                    { v: 'precio_desc', l: 'Mayor precio' },
                                    { v: 'recientes', l: 'Más recientes' },
                                ].map(o => (
                                    <li key={o.v}>
                                        <Link
                                            href={buildUrl({ orden: o.v, page: '1' })}
                                            className={`${styles.ordenItem} ${orden === o.v ? styles.ordenItemActive : ''}`}
                                        >
                                            {o.l}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Limpiar filtros */}
                        {(categoria || buscar || orden !== 'nombre_asc') && (
                            <Link href="/productos" className={`btn btn-ghost ${styles.clearBtn}`}>
                                ✕ Limpiar filtros
                            </Link>
                        )}
                    </aside>

                    {/* Grid */}
                    <main className={styles.main}>
                        {products.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">🔍</div>
                                <h3>Sin resultados</h3>
                                <p>Intentá con otro término o categoría</p>
                                <Link href="/productos" className="btn btn-primary" style={{ marginTop: '16px' }}>Ver todos</Link>
                            </div>
                        ) : (
                            <>
                                <div className={styles.grid}>
                                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>

                                {/* Paginación */}
                                {totalPages > 1 && (
                                    <div className={styles.pagination}>
                                        {page > 1 && (
                                            <Link href={buildUrl({ page: String(page - 1) })} className={styles.pageBtn}>
                                                ← Anterior
                                            </Link>
                                        )}
                                        <div className={styles.pageNumbers}>
                                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                                let p2;
                                                if (totalPages <= 7) p2 = i + 1;
                                                else if (page <= 4) p2 = i + 1;
                                                else if (page >= totalPages - 3) p2 = totalPages - 6 + i;
                                                else p2 = page - 3 + i;
                                                return (
                                                    <Link
                                                        key={p2}
                                                        href={buildUrl({ page: String(p2) })}
                                                        className={`${styles.pageNum} ${p2 === page ? styles.pageNumActive : ''}`}
                                                    >
                                                        {p2}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                        {page < totalPages && (
                                            <Link href={buildUrl({ page: String(page + 1) })} className={styles.pageBtn}>
                                                Siguiente →
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

function getCatName(categories, slug) {
    const cat = categories.find(c => c.slug === slug);
    return cat ? cat.name : 'Productos';
}
