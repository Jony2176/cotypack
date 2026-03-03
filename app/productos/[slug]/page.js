import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { parseImages, formatPrice, parseVariants, getProductDisplayPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import AddToCart from './AddToCart';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return { title: 'Producto no encontrado' };
    return {
        title: product.name,
        description: product.description || `Comprá ${product.name} en Cotypack`,
    };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
        where: { slug, active: true },
        include: { category: true },
    });

    if (!product) notFound();

    const images = parseImages(product.images);

    const variants = parseVariants(product.variants);
    const hasVariants = variants.length > 0;
    const displayPrice = getProductDisplayPrice(product);

    const hasDiscount = !hasVariants && product.comparePrice && product.comparePrice > product.price;
    const discountPct = hasDiscount ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

    // Productos relacionados
    const related = await prisma.product.findMany({
        where: {
            active: true,
            categoryId: product.categoryId,
            id: { not: product.id },
        },
        take: 4,
        include: { category: { select: { name: true, slug: true } } },
    });

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link href="/">Inicio</Link>
                    <span>›</span>
                    <Link href="/productos">Productos</Link>
                    {product.category && (
                        <>
                            <span>›</span>
                            <Link href={`/productos?categoria=${product.category.slug}`}>{product.category.name}</Link>
                        </>
                    )}
                    <span>›</span>
                    <span className={styles.breadcrumbCurrent}>{product.name}</span>
                </nav>

                <div className={styles.product}>
                    {/* Galería */}
                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            {images.length > 0 ? (
                                <Image
                                    src={images[0]}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className={styles.img}
                                    priority
                                />
                            ) : (
                                <div className={styles.imgPlaceholder}>🎉</div>
                            )}
                            {hasDiscount && (
                                <div className={styles.discountBadge}>-{discountPct}%</div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className={styles.thumbs}>
                                {images.map((img, i) => (
                                    <div key={i} className={`${styles.thumb} ${i === 0 ? styles.thumbActive : ''}`}>
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
                                {displayPrice.isRange && <span style={{ fontSize: '0.6em', opacity: 0.8, marginRight: '8px', fontWeight: '500' }}>Desde</span>}
                                {formatPrice(displayPrice.minPrice)}
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
                                    <span className={styles.stockLow}>⚡ ¡Solo quedan {product.stock} unidades!</span>
                                ) : (
                                    <span className={styles.stockOk}>✓ En stock ({product.stock} disponibles)</span>
                                )}
                            </div>
                        )}

                        {/* Descripción */}
                        {product.description && (
                            <div className={styles.description}>
                                <h3 className={styles.descTitle}>Descripción</h3>
                                <p className={styles.descText}>{product.description}</p>
                            </div>
                        )}

                        {/* Add to cart */}
                        <AddToCart product={product} />

                        {/* Beneficios */}
                        <div className={styles.perks}>
                            <div className={styles.perk}><span>📦</span> Envío a todo el país</div>
                            <div className={styles.perk}><span>💳</span> Todos los medios de pago</div>
                            <div className={styles.perk}><span>🎁</span> Packaging especial disponible</div>
                        </div>
                    </div>
                </div>

                {/* Relacionados */}
                {related.length > 0 && (
                    <section className={styles.related}>
                        <h2 className={styles.relatedTitle}>También te puede interesar</h2>
                        <div className={styles.relatedGrid}>
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
