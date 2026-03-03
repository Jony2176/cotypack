import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Venta Mayorista',
  description: 'Canal exclusivo para compras mayoristas, comercios y revendedores.',
};

export default function MayoristasPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Canal Mayorista</h1>
          <p className={styles.subtitle}>Potenciamos tu negocio con los mejores precios del mercado</p>
        </div>
      </section>

      <section className={styles.benefits}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoCard}>
              <div className={styles.icon}>📦</div>
              <h3>Venta por Bulto</h3>
              <p>Precios especiales en cajas cerradas y bultos de bolsas.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.icon}>🚚</div>
              <h3>Logística Propia</h3>
              <p>Despachos rápidos para que nunca te quedes sin stock.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.icon}>💰</div>
              <h3>Descuentos Escalonados</h3>
              <p>A mayor volumen de compra, mayor es tu margen de ganancia.</p>
            </div>
          </div>

          <div className={styles.ctaBox}>
            <h2>¿Querés ser revendedor?</h2>
            <p>
              Completá el formulario de contacto o escribinos directamente por WhatsApp 
              especificando que es para **Venta Mayorista**.
            </p>
            <div className={styles.actions}>
              <Link href="/contacto" className="btn btn-primary btn-lg">Ir a contacto</Link>
              <a href="https://wa.me/5491136458535" className="btn btn-secondary btn-lg">WhatsApp Mayorista</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
