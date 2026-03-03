import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { parseImages, formatPrice, parseVariants, getProductDisplayPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import ProductClient from './ProductClient';
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

                <ProductClient 
                    product={product} 
                    images={images} 
                    displayPrice={displayPrice} 
                    hasDiscount={hasDiscount} 
                    discountPct={discountPct} 
                    hasVariants={hasVariants} 
                />

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
