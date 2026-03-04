import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Métodos de Pago | Cotypack by Barby',
  description: 'Opciones de pago disponibles: MercadoPago y efectivo.',
};

export default function PagosPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Métodos de Pago</h1>
          <p className={styles.subtitle}>Elegí la opción que más te convenga</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {/* MercadoPago */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.icon}>
                  <img src="/images/mercadopago-icon.svg" alt="MercadoPago" width="32" height="32" style={{borderRadius: '6px', filter: 'grayscale(100%) brightness(0.4) sepia(1) hue-rotate(200deg) saturate(2)'}} />
                </div>
                <h2>MercadoPago</h2>
              </div>
              <p className={styles.description}>
                Pagá con tarjeta de crédito, débito o dinero en tu cuenta de MercadoPago.
                Es rápido, seguro y protegido.
              </p>
              <div className={styles.detailsBox}>
                <h3>Datos para transferir:</h3>
                <div className={styles.dataRow}>
                  <span>Titular:</span>
                  <strong>Barbara Denisa Ertel</strong>
                </div>
                <div className={styles.dataRow}>
                  <span>CVU:</span>
                  <strong className={styles.copyText}>0000003100010128642581</strong>
                </div>
                <div className={styles.dataRow}>
                  <span>Alias:</span>
                  <strong className={styles.copyText}>barby.d.e</strong>
                </div>
              </div>
            </div>

            {/* Efectivo */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.icon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <path d="M6 12h.01"/>
                    <path d="M18 12h.01"/>
                  </svg>
                </div>
                <h2>Efectivo</h2>
              </div>
              <p className={styles.description}>
                Pagá en efectivo al momento de retirar tu pedido en nuestro local.
              </p>
              <div className={styles.detailsBox}>
                <h3>Opciones:</h3>
                <ul className={styles.list}>
                  <li>Retiro en punto de venta (local)</li>
                  <li>Pago en mostrador</li>
                  <li>Rapipago / Pago Fácil (solo mayoristas)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Info adicional */}
          <div className={styles.infoSection}>
            <h2>Información importante</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>¿Cuándo se procesa mi pedido?</h3>
                <p>
                  Los pedidos se procesan una vez confirmado el pago. Con MercadoPago 
                  es inmediato; con efectivo al momento de la entrega o retiro.
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>¿Necesito factura?</h3>
                <p>
                  Sí, emitimos factura A o B según corresponda. Para factura A indicanos 
                  tus datos fiscales al momento de la compra.
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>¿Tienen descuentos por pago contado?</h3>
                <p>
                  Sí, en compras mayoristas ofrecemos descuentos especiales por pago 
                  adelantado o transferencia. Consultanos.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ctaBox}>
            <p>¿Tenés dudas sobre cómo pagar?</p>
            <Link href="/contacto" className="btn btn-primary btn-lg">
              Escribinos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
