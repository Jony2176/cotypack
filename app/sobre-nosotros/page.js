import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

/* SVG Icons - No emojis for professional design */
const IconSparkles = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
const IconTarget = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconMessage = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export const metadata = {
  title: 'Sobre Nosotros | Cotypack by Barby',
  description: 'Conocé la historia de Cotypack. Más de 10 años ayudando a familias y negocios con cotillón, papelera y repostería.',
};

export default function SobreNosotrosPage() {
  return (
    <div className={styles.page}>
      {/* Hero con Claymorphism */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.heroBadge}><IconSparkles /> Desde 2014</span>
          <h1 className={styles.title}>Pasión por tus festejos</h1>
          <p className={styles.subtitle}>Más de 10 años ayudando a crear momentos inolvidables</p>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Años de trayectoria</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Clientes satisfechos</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>Productos disponibles</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>⭐ 4.9</span>
              <span className={styles.statLabel}>Calificación promedio</span>
            </div>
          </div>
        </div>
      </section>

      {/* Historia con Claymorphism */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.textContent}>
              <h2>Nuestra Historia</h2>
              <p>
                Cotypack nació de la unión de dos mundos: la <strong>magia del cotillón</strong> y la 
                <strong>practicidad de la papelera</strong>. Nuestra fundadora, Barby, comenzó con un 
                pequeño sueño: ayudar a las familias a crear momentos inolvidables sin complicaciones.
              </p>
              <p>
                Hoy somos un <strong>referente en la zona</strong>, ofreciendo no solo artículos de fiesta, 
                sino también insumos críticos para comercios, emprendedores gastronómicos y amantes 
                de la repostería.
              </p>
              
              <div className={styles.values}>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}><IconTarget /></div>
                  <div>
                    <strong>Calidad Garantizada</strong>
                    <span>Seleccionamos los mejores materiales para que tu evento sea perfecto.</span>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}><IconMessage /></div>
                  <div>
                    <strong>Atención Personalizada</strong>
                    <span>Te asesoramos en cada compra. Tu éxito es nuestro éxito.</span>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}><IconZap /></div>
                  <div>
                    <strong>Entrega Rápida</strong>
                    <span>Sabemos que los festejos no esperan. Stock disponible siempre.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image 
                  src="/images/logo.png" 
                  alt="Cotypack by Barby - Logo" 
                  width={400} 
                  height={400} 
                  className={styles.aboutImg}
                  priority
                />
              </div>
              <div className={styles.trustBadge}>
                <span className={styles.checkIcon}><IconCheck /></span>
                <span>Emprendimiento familiar<br/>argentino</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h3>¿Tenés un evento especial?</h3>
            <p>Escribinos y te ayudamos a armar el pack perfecto para tu fiesta.</p>
            <div className={styles.ctaButtons}>
              <Link href="/productos" className="btn btn-secondary btn-lg">
                Ver productos →
              </Link>
              <a href="https://wa.me/5491150058648" className="btn btn-primary btn-lg">
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
