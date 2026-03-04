import Link from 'next/link';
import styles from './page.module.css';
import MayoristaForm from './MayoristaForm';

/* SVG Icons - No emojis for professional design */
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconPackage = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
  </svg>
);
const IconTruck = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);
const IconCoins = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>
  </svg>
);
const IconHandshake = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.27.13a3 3 0 0 0 2.54.05l2.38-.94"/><path d="m18 5 3 3"/><path d="m8 13-2.5 2.5a1 1 0 1 0 3 3l2.5-2.5"/>
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconZap = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export const metadata = {
  title: 'Venta Mayorista | Cotypack by Barby',
  description: 'Canal exclusivo para compras mayoristas. Descuentos por volumen, logística propia y precios especiales para comercios y revendedores.',
};

export default function MayoristasPage() {
  return (
    <div className={styles.page}>
      {/* Hero con monto mínimo destacado */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge}><IconTarget /> Exclusivo para negocios</div>
          <h1 className={styles.title}>Venta Mayorista</h1>
          <p className={styles.subtitle}>
            Potenciamos tu negocio con los mejores precios del mercado
          </p>
          <div className={styles.minOrderBadge}>
            <span className={styles.minOrderLabel}>Compra mínima</span>
            <span className={styles.minOrderAmount}>$150.000</span>
          </div>
        </div>
      </section>

      {/* Beneficios Grid */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>¿Por qué elegirnos?</h2>
            <p>Diseñamos este canal pensando en tu crecimiento</p>
          </div>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><IconPackage /></div>
              <h3>Venta por Bulto</h3>
              <p>Precios especiales en cajas cerradas y bultos completos de bolsas.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><IconTruck /></div>
              <h3>Logística Propia</h3>
              <p>Despachos rápidos para que nunca te quedes sin stock en momentos clave.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><IconCoins /></div>
              <h3>Descuentos Escalonados</h3>
              <p>A mayor volumen de compra, mayor es tu margen de ganancia.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><IconHandshake /></div>
              <h3>Atención Prioritaria</h3>
              <p>Canal directo de comunicación para resolver tus consultas al instante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario + Info */}
      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formGrid}>
            {/* Formulario */}
            <div className={styles.formContainer}>
              <div className={styles.formCard}>
                <h2>Solicitá tu cuenta mayorista</h2>
                <p className={styles.formSubtitle}>
                  Completá el formulario y te contactamos en menos de 24 horas.
                </p>
                <MayoristaForm />
              </div>
            </div>

            {/* Info lateral */}
            <div className={styles.infoContainer}>
              <div className={styles.infoCard}>
                <h3>¿Tenés urgencia?</h3>
                <p>Escribinos directamente por WhatsApp y te atendemos al instante.</p>
                <a 
                  href="https://wa.me/5491159058648?text=Hola!%20Vengo%20de%20la%20web%20y%20quiero%20consultar%20por%20venta%20mayorista." 
                  className={`btn btn-primary btn-lg ${styles.whatsappBtn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.674 1.436 5.662 1.436h.008c6.548 0 11.88-5.338 11.883-11.894a11.785 11.785 0 00-3.488-8.413z"/>
                  </svg>
                  WhatsApp Mayorista
                </a>
              </div>

              <div className={styles.infoCard}>
                <h3>¿Ya tenés cuenta?</h3>
                <p>Si ya sos cliente mayorista, accedé al catálogo con precios especiales.</p>
                <Link href="/mayoristas/login" className="btn btn-outline btn-lg">
                  Iniciar sesión
                </Link>
              </div>

              <div className={styles.trustIndicators}>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}><IconLock /></span>
                  <span>Datos protegidos</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}><IconZap /></span>
                  <span>Respuesta en 24hs</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}><IconCheck /></span>
                  <span>Sin compromiso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
