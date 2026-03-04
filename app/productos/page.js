import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';
import Link from 'next/link';
import SearchAutocomplete from '@/components/SearchAutocomplete';

export const metadata = {
    title: 'Catálogo de Productos',
    description: 'Explorá toda nuestra variedad de artículos de cotillón y papelería: pelucas, bolsas, vajilla descartable, decoración y mucho más.',
};

export default async function ProductosPage({ searchParams }) {
    const params = await searchParams;
    const page = Math.max(1, parseInt(params.page || '1'));
    const categoria = params.categoria || '';
    const sub = params.sub || '';
    const subsub = params.subsub || '';
    const buscar = params.buscar || '';
    const orden = params.orden || 'nombre_asc';
    const LIMIT = 24;

    function normalize(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    // Build where clause with subcategory support
    const where = { active: true };
    const buscarNorm = buscar ? normalize(buscar) : '';

    if (subsub) {
        // Filtering by sub-subcategory (most specific)
        where.category = { slug: subsub };
    } else if (sub) {
        // Filtering by subcategory — also include its children if any
        const subCat = await prisma.category.findUnique({
            where: { slug: sub },
            include: { children: { select: { id: true } } }
        });
        if (subCat && subCat.children.length > 0) {
            const ids = [subCat.id, ...subCat.children.map(c => c.id)];
            where.categoryId = { in: ids };
        } else if (subCat) {
            where.categoryId = subCat.id;
        }
    } else if (categoria) {
        // Filtering by parent: include all its children and grandchildren
        const parentCat = await prisma.category.findUnique({
            where: { slug: categoria },
            include: { children: { select: { id: true, children: { select: { id: true } } } } }
        });
        if (parentCat && parentCat.children.length > 0) {
            const ids = [];
            parentCat.children.forEach(c => {
                ids.push(c.id);
                if (c.children) c.children.forEach(gc => ids.push(gc.id));
            });
            where.categoryId = { in: ids };
        } else if (parentCat) {
            where.categoryId = parentCat.id;
        }
    }

    const orderMap = {
        'nombre_asc': { name: 'asc' },
        'nombre_desc': { name: 'desc' },
        'precio_asc': { price: 'asc' },
        'precio_desc': { price: 'desc' },
        'recientes': { createdAt: 'desc' },
    };
    const orderBy = orderMap[orden] || { name: 'asc' };

    // Fetch products, count, parent categories, and subcategories of selected parent
    let products, total;
    const baseQuery = {
        where,
        orderBy,
        include: { category: { select: { name: true, slug: true } } },
    };

    if (buscarNorm) {
        // Accent-insensitive search: fetch all, filter in JS, then paginate
        const allProducts = await prisma.product.findMany(baseQuery);
        const filtered = allProducts.filter(p =>
            normalize(p.name).includes(buscarNorm) ||
            (p.description && normalize(p.description).includes(buscarNorm))
        );
        total = filtered.length;
        products = filtered.slice((page - 1) * LIMIT, page * LIMIT);
    } else {
        [products, total] = await Promise.all([
            prisma.product.findMany({ ...baseQuery, skip: (page - 1) * LIMIT, take: LIMIT }),
            prisma.product.count({ where }),
        ]);
    }

    const [parentCategories] = await Promise.all([
        prisma.category.findMany({
            where: { parentId: null },
            orderBy: { displayOrder: 'asc' },
            include: {
                children: {
                    orderBy: { displayOrder: 'asc' },
                    select: { id: true, name: true, slug: true }
                }
            }
        }),
    ]);

    // Find current parent category and its subcategories
    const activeParent = parentCategories.find(c => c.slug === categoria);
    const subcategories = activeParent?.children || [];

    // Find sub-subcategories if active sub has children
    const activeSub = subcategories.find(c => c.slug === sub);
    let subSubcategories = [];
    if (activeSub) {
        const subWithChildren = await prisma.category.findUnique({
            where: { id: activeSub.id },
            include: { children: { orderBy: { displayOrder: 'asc' }, select: { id: true, name: true, slug: true } } }
        });
        subSubcategories = subWithChildren?.children || [];
    }

    const totalPages = Math.ceil(total / LIMIT);

    function buildUrl(overrides) {
        const p = { page: '1', categoria, sub, subsub, buscar, orden, ...overrides };
        // Si se navega a categoría/sub/subsub, limpiar búsqueda
        if ('categoria' in overrides || 'sub' in overrides || 'subsub' in overrides) p.buscar = '';
        // Si se cambia categoría, limpiar sub y subsub
        if ('categoria' in overrides) { p.sub = overrides.sub || ''; p.subsub = ''; }
        // Si se cambia sub, limpiar subsub
        if ('sub' in overrides) { p.subsub = overrides.subsub || ''; }
        // Si se busca, limpiar todo
        if (p.buscar) { p.categoria = ''; p.sub = ''; p.subsub = ''; }
        const q = new URLSearchParams();
        if (p.page && p.page !== '1') q.set('page', p.page);
        if (p.categoria) q.set('categoria', p.categoria);
        if (p.sub) q.set('sub', p.sub);
        if (p.subsub) q.set('subsub', p.subsub);
        if (p.buscar) q.set('buscar', p.buscar);
        if (p.orden && p.orden !== 'nombre_asc') q.set('orden', p.orden);
        const qs = q.toString();
        return `/productos${qs ? `?${qs}` : ''}`;
    }

    // Get display title
    function getTitle() {
        if (buscar) return `Resultados para "${buscar}"`;
        if (subsub && activeSub) {
            const ssCat = subSubcategories.find(c => c.slug === subsub);
            return ssCat ? `${activeParent.name} › ${activeSub.name} › ${ssCat.name}` : `${activeParent.name} › ${activeSub.name}`;
        }
        if (sub) {
            const subCat = subcategories.find(c => c.slug === sub);
            return subCat ? `${activeParent.name} › ${subCat.name}` : 'Productos';
        }
        if (categoria && activeParent) return activeParent.name;
        return 'Todos los Productos';
    }

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>{getTitle()}</h1>
                        <p className={styles.count}>
                            {total === 0 ? 'Sin resultados' : `${total} producto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                </div>

                <div className={styles.searchBar}>
                    <SearchAutocomplete defaultValue={buscar} categoria={categoria} sub={sub} orden={orden} />
                </div>

                <div className={styles.layout}>
                    {/* Sidebar filtros */}
                    <aside className={styles.sidebar}>
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
                        {(categoria || sub || buscar || orden !== 'nombre_asc') && (
                            <Link href="/productos" className={`btn btn-ghost ${styles.clearBtn}`}>
                                ✕ Limpiar filtros
                            </Link>
                        )}
                    </aside>

                    {/* Grid */}
                    <main className={styles.main}>
                        {/* Categorías principales — Chips */}
                        <div className={styles.chipsContainer}>
                            <h2 className={styles.chipsTitle}>Categorías</h2>
                            <div className={styles.chips}>
                                <Link
                                    href="/productos"
                                    scroll={false}
                                    className={`${styles.chip} ${!categoria && !sub ? styles.chipActive : ''}`}
                                >
                                    ✨ Todas
                                </Link>
                                {parentCategories.map(cat => (
                                    <Link
                                        key={cat.id}
                                        href={buildUrl({ categoria: cat.slug, sub: '', page: '1' })}
                                        scroll={false}
                                        className={`${styles.chip} ${categoria === cat.slug ? styles.chipActive : ''}`}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Subcategorías — aparecen al seleccionar una categoría padre */}
                        {subcategories.length > 0 && (
                            <div className={styles.subChipsContainer}>
                                <div className={styles.subChips}>
                                    <Link
                                        href={buildUrl({ sub: '', page: '1' })}
                                        scroll={false}
                                        className={`${styles.subChip} ${!sub ? styles.subChipActive : ''}`}
                                    >
                                        Todo en {activeParent.name}
                                    </Link>
                                    {subcategories.map(sc => (
                                        <Link
                                            key={sc.id}
                                            href={buildUrl({ sub: sc.slug, page: '1' })}
                                            scroll={false}
                                            className={`${styles.subChip} ${sub === sc.slug ? styles.subChipActive : ''}`}
                                        >
                                            {sc.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {subSubcategories.length > 0 && (
                            <div className={styles.subChipsContainer}>
                                <div className={styles.subChips}>
                                    <Link
                                        href={buildUrl({ subsub: '', page: '1' })}
                                        scroll={false}
                                        className={`${styles.subChip} ${!subsub ? styles.subChipActive : ''}`}
                                    >
                                        Todo en {activeSub.name}
                                    </Link>
                                    {subSubcategories.map(ssc => (
                                        <Link
                                            key={ssc.id}
                                            href={buildUrl({ subsub: ssc.slug, page: '1' })}
                                            scroll={false}
                                            className={`${styles.subChip} ${subsub === ssc.slug ? styles.subChipActive : ''}`}
                                        >
                                            {ssc.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {products.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                </div>
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
