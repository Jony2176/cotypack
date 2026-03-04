'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { formatPrice, getProductImages, parseVariants, getProductDisplayPrice } from '@/lib/utils';
import styles from './ProductCard.module.css';

/* Cart SVG — Lucide style, no emojis */
const IconCart = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const IconStar = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default function ProductCard({ product, mayorista = false }) {
    const { addToCart } = useCart();
    const router = useRouter();
    const images = getProductImages(product);
    const mainImage = images[0];
    const variants = parseVariants(product.variants);
    const hasVariants = variants.length > 0;
    const displayPrice = getProductDisplayPrice(product);

    // Si es mayorista aplicamos un descuento visual del 15% (ajustar luego)
    const WHOL_DISCOUNT = 0.85; 
    const finalPrice = mayorista ? displayPrice.minPrice * WHOL_DISCOUNT : displayPrice.minPrice;

    // Calculo total de stock si tiene variantes
    const totalVariantStock = hasVariants ? variants.reduce((sum, v) => sum + Number(v.stock), 0) : product.stock;
    const hasStock = hasVariants ? totalVariantStock > 0 : product.stock > 0;

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasVariants) {
            router.push(`/productos/${product.slug}${mayorista ? '?m=1' : ''}`);
            return;
        }
        addToCart({ 
            id: product.id, 
            name: product.name, 
            price: mayorista ? product.price * WHOL_DISCOUNT : product.price, 
            image: mainImage, 
            slug: product.slug, 
            stock: product.stock,
            isMayorista: mayorista 
        });
    };

    return (
        <Link href={`/productos/${product.slug}${mayorista ? '?m=1' : ''}`} className={`${styles.card} ${mayorista ? styles.cardMayorista : ''}`} aria-label={`Ver ${product.name}`}>
            {/* Imagen */}
            <div className={styles.imageWrap}>
                {mainImage ? (
                    <img
                        src={mainImage}
                        alt={product.name}
                        className={styles.image}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="4" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                )}

                {/* Badges */}
                <div className={styles.badges}>
                    {product.featured && (
                        <span className={styles.featuredBadge}>
                            <IconStar /> Destacado
                        </span>
                    )}
                    {mayorista && (
                        <span className={styles.mayoristaBadge}>
                            PRECIO MAYORISTA
                        </span>
                    )}
                </div>

                {/* Sin stock overlay */}
                {!hasStock && (
                    <div className={styles.outOfStock}>Sin stock</div>
                )}

                {/* Add to cart / View options overlay */}
                {hasStock && (
                    <div className={styles.overlay}>
                        <button
                            className={styles.addBtn}
                            onClick={handleAdd}
                            aria-label={hasVariants ? `Ver opciones de ${product.name}` : `Agregar ${product.name} al carrito`}
                        >
                            {hasVariants ? 'Ver opciones' : <><IconCart /> Agregar</>}
                        </button>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className={styles.info}>
                {product.category && (
                    <span className={styles.category}>{product.category.name}</span>
                )}
                <h3 className={styles.name}>{product.name}</h3>

                <div className={styles.priceRow}>
                    <div className={styles.priceCol}>
                        <span className={styles.price}>
                            {displayPrice.isRange && <span style={{ fontSize: '0.65em', opacity: 0.8, marginRight: '4px', fontWeight: '500' }}>Desde</span>}
                            {formatPrice(finalPrice)}
                        </span>
                        {mayorista && (
                            <span className={styles.retailPrice}>PVP: {formatPrice(displayPrice.minPrice)}</span>
                        )}
                    </div>
                    {product.comparePrice && product.comparePrice > product.price && !hasVariants && !mayorista && (
                        <span className={styles.comparePrice}>{formatPrice(product.comparePrice)}</span>
                    )}
                </div>

                <div className={styles.stockRow}>
                    {hasStock ? (
                        <span className={styles.inStock}>
                            <IconCheck /> En stock
                        </span>
                    ) : (
                        <span className={styles.noStock}>Sin stock</span>
                    )}
                </div>
            </div>
        </Link>
    );
}

