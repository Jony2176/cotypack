import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export const revalidate = 60;

async function getData() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({ orderBy: { displayOrder: 'asc' }, take: 6 }),
    prisma.product.findMany({
      where: { featured: true, active: true },
      take: 8,
      include: { category: { select: { name: true, slug: true } } },
    }),
  ]);
  return { categories, featuredProducts };
}

/* ─── SVG Icons (Lucide-style) ─────────────────────── */
const IconTruck = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const IconCreditCard = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const IconGift = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);
const IconZap = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconParty = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="M4 3h.01" /><path d="M22 8h.01" /><path d="M15 2h.01" /><path d="M22 20h.01" />
    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
    <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
    <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
    <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z" />
  </svg>
);

/* Category SVG icons (one per slug) */
const CAT_ICONS = {
  'globos-decoracion': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="10" r="7" /><path d="M12 17v1" /><path d="M9 20h6" />
    </svg>
  ),
  'cotillon': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z" />
      <path d="M4 3h.01" /><path d="M22 8h.01" /><path d="M15 2h.01" />
    </svg>
  ),
  'vajilla-descartable': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <line x1="7" y1="2" x2="7" y2="11" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h1v5a1 1 0 0 0 2 0V2" />
    </svg>
  ),
  'pinatas': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  'bolsas-empaques': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  ),
  'tematico-infantil': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const BENEFITS = [
  { Icon: IconTruck, title: 'Envío a todo el país', desc: 'Despachamos por correo a cualquier punto de Argentina' },
  { Icon: IconCreditCard, title: 'Todos los medios de pago', desc: 'Tarjeta, transferencia, MercadoPago y efectivo' },
  { Icon: IconGift, title: 'Packs y combos', desc: 'Armamos packs personalizados según tu presupuesto' },
  { Icon: IconZap, title: 'Stock disponible', desc: 'Gran variedad siempre disponible, sin esperas' },
];

function getCatColor(i) {
  const colors = ['#4F46E5', '#A855F7', '#EC4899', '#10B981', '#3B82F6', '#F59E0B'];
  return colors[i % colors.length];
}

const CAT_IMAGES = {
  cotillon: '/images/cat-cotillon.webp',
  'descartables': '/images/cat-papelera.webp',
  'papelera': '/images/cat-papelera.webp',
  reposteria: '/images/cat-reposteria.webp',
};

export default async function HomePage() {
  const { categories, featuredProducts } = await getData();

  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/hero-bg.webp" alt="Cotypack hero background" fill className={styles.heroImg} priority />
          <div className={styles.heroOverlay} />
          <div className={styles.heroBubble1} />
          <div className={styles.heroBubble2} />
          <div className={styles.heroBubble3} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>
            <IconParty /> Cotillón · Papelera · Repostería
          </span>
          <h1 className={styles.heroTitle}>
            Todo para tu fiesta<br />
            <span className={styles.heroGradient}>en un solo lugar</span>
          </h1>
          <p className={styles.heroSub}>
            Cotillón, papelería y repostería para tus eventos.<br />
            Todo lo que necesitás para tu próximo evento.
          </p>
          <div className={styles.heroActions}>
            <Link href="/productos" className="btn btn-primary btn-lg">Ver catálogo →</Link>
            <Link href="/contacto" className="btn btn-outline btn-lg">Contactarnos</Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}><strong>1000+</strong><span>Productos</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>6</strong><span>Categorías</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>AR</strong><span>Todo el país</span></div>
          </div>
        </div>
      </section>

      {/* ─── BENEFICIOS ─── */}
      <section className={styles.benefits}>
        <div className="container">
          <div className={styles.benefitsGrid}>
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div key={title} className={styles.benefitCard}>
                <span className={styles.benefitIcon}><Icon /></span>
                <h3 className={styles.benefitTitle}>{title}</h3>
                <p className={styles.benefitDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORÍAS ─── */}
      {categories.length > 0 && (
        <section className={`section ${styles.categoriesSection}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Explorá por categoría</h2>
              <p className="text-muted">Encontrá todo lo que necesitás para tu fiesta</p>
            </div>
            <div className={styles.categoriesGrid}>
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/productos?categoria=${cat.slug}`}
                  className={styles.catCard}
                  style={{ '--cat-color': getCatColor(i) }}
                >
                  <div className={styles.catBg}>
                    {CAT_IMAGES[cat.slug] && (
                      <Image src={CAT_IMAGES[cat.slug]} alt={cat.name} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.catImg} />
                    )}
                    <div className={styles.catOverlay} />
                  </div>
                  <div className={styles.catContent}>
                    <div className={styles.catIcon}>
                      {CAT_ICONS[cat.slug] || (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                    </div>
                    <h3 className={styles.catName}>{cat.name}</h3>
                    {cat.description && <p className={styles.catDesc}>{cat.description}</p>}
                    <span className={styles.catArrow}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── DESTACADOS ─── */}
      {featuredProducts.length > 0 && (
        <section className={`section ${styles.featuredSection}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <IconStar /> Productos destacados
              </h2>
              <p className="text-muted">Los más elegidos por nuestros clientes</p>
            </div>
            <div className={styles.productsGrid}>
              {featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className={styles.viewAll}>
              <Link href="/productos" className="btn btn-outline">Ver todos los productos →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA FINAL ─── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <Image src="/images/banner-cta.webp" alt="Contacto" fill className={styles.ctaImg} />
            <div className={styles.ctaOverlay} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>¿Tenés un evento especial?</h2>
              <p className={styles.ctaSub}>Escribinos y te ayudamos a armar el pack perfecto para tu fiesta.</p>
              <Link href="/contacto" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Contactarnos ahora <IconParty />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
