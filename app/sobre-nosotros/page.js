import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'Sobre Nosotros',
  description: 'Conocé la historia de Cotypack by Barby y nuestro compromiso con tus festejos.',
};

export default function SobreNosotrosPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Pasión por tus festejos</h1>
          <p className={styles.subtitle}>Conocé quiénes estamos detrás de Cotypack by Barby</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.textContent}>
              <h2>Nuestra Historia</h2>
              <p>
                Cotypack nació de la unión de dos mundos: la magia del cotillón y la practicidad de la papelera. 
                Nuestra fundadora, Barby, comenzó con un pequeño sueño de ayudar a las familias a crear momentos inolvidables 
                sin complicaciones.
              </p>
              <p>
                Hoy, nos hemos convertido en un referente en la zona, ofreciendo no solo artículos de fiesta, 
                sino también insumos críticos para comercios, emprendedores gastronómicos y amantes de la repostería.
              </p>
              <div className={styles.values}>
                <div className={styles.valueItem}>
                  <strong>Calidad</strong>
                  <span>Seleccionamos los mejores materiales para tus eventos.</span>
                </div>
                <div className={styles.valueItem}>
                  <strong>Atención</strong>
                  <span>Te asesoramos de forma personalizada en cada compra.</span>
                </div>
                <div className={styles.valueItem}>
                  <strong>Rapidez</strong>
                  <span>Sabemos que los festejos no esperan.</span>
                </div>
              </div>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image 
                  src="/images/logo.png" 
                  alt="Cotypack Logo" 
                  width={400} 
                  height={400} 
                  className={styles.aboutImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
