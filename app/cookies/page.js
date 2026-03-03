import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Política de Cookies | Cotypack by Barby',
  description: 'Política de cookies y tecnologías de seguimiento de Cotypack by Barby.',
};

export default function CookiesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Política de Cookies</h1>
          <p className={styles.subtitle}>Te explicamos cómo usamos las cookies</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.legalContent}>
            <h2>1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
              (computadora, tablet o móvil) cuando visitás un sitio web. Nos permiten 
              reconocer tu dispositivo y recordar información sobre tu visita.
            </p>

            <h2>2. Tipos de Cookies que Usamos</h2>
            
            <h3>2.1 Cookies Esenciales</h3>
            <p>
              Son necesarias para el funcionamiento básico del sitio. Sin ellas, no podrías 
              navegar correctamente ni realizar compras.
            </p>
            <ul>
              <li>Cookie de sesión (mantenerte logueado)</li>
              <li>Cookie del carrito de compras</li>
              <li>Preferencias de idioma y moneda</li>
              <li>Seguridad (protección contra CSRF)</li>
            </ul>

            <h3>2.2 Cookies de Rendimiento y Analíticas</h3>
            <p>
              Nos ayudan a entender cómo interactuás con el sitio, qué páginas son más 
              visitadas y si encontrás errores. Toda la información es anónima.
            </p>
            <ul>
              <li>Google Analytics (análisis de tráfico)</li>
              <li>Hotjar (mapas de calor y grabaciones anonimizadas)</li>
              <li>Rendimiento del servidor</li>
            </ul>

            <h3>2.3 Cookies de Funcionalidad</h3>
            <p>
              Permiten que el sitio recuerde tus preferencias y te ofrezca una experiencia 
              personalizada.
            </p>
            <ul>
              <li>Últimos productos vistos</li>
              <li>Direcciones de envío guardadas</li>
              <li>Preferencias de visualización</li>
            </ul>

            <h3>2.4 Cookies de Marketing</h3>
            <p>
              Se utilizan para mostrarte publicidad relevante y medir la efectividad de 
              nuestras campañas. Solo se activan con tu consentimiento.
            </p>
            <ul>
              <li>Facebook Pixel</li>
              <li>Google Ads</li>
              <li>Remarketing</li>
            </ul>

            <h2>3. Cookies de Terceros</h2>
            <p>Algunas cookies son colocadas por servicios de terceros que utilizamos:</p>
            
            <table className={styles.cookieTable}>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google Analytics</td>
                  <td>Análisis de tráfico web</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td>MercadoPago</td>
                  <td>Procesamiento de pagos</td>
                  <td>Sesión</td>
                </tr>
                <tr>
                  <td>Facebook</td>
                  <td>Publicidad y remarketing</td>
                  <td>3 meses</td>
                </tr>
              </tbody>
            </table>

            <h2>4. Gestión de Cookies</h2>
            <p>Podés controlar y/o eliminar las cookies de la siguiente manera:</p>
            
            <h3>Desde tu navegador:</h3>
            <ul>
              <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
              <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
              <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
            </ul>

            <div className={styles.cookieBanner}>
              <h3>Centro de Preferencias de Cookies</h3>
              <p>Próximamente podrás gestionar tus preferencias de cookies directamente desde aquí.</p>
              <p className={styles.small}>
                Mientras tanto, usá la configuración de tu navegador para controlar las cookies.
              </p>
            </div>

            <h2>5. Impacto de Desactivar Cookies</h2>
            <p>
              Si desactivás las cookies esenciales, el sitio no funcionará correctamente. 
              Si desactivás cookies de rendimiento o marketing, podrás seguir usando el sitio 
              pero la experiencia podría no ser óptima.
            </p>

            <h2>6. Actualizaciones</h2>
            <p>
              Esta política puede actualizarse para reflejar cambios en las cookies que usamos 
              o por requerimientos legales. Te recomendamos revisarla periódicamente.
            </p>

            <h2>7. Más Información</h2>
            <p>
              Para saber más sobre las cookies y cómo gestionarlas, visitá 
              <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer"> AboutCookies.org</a>.
            </p>

            <h2>8. Contacto</h2>
            <p>
              Si tenés preguntas sobre nuestra política de cookies, escribinos a:
            </p>
            <ul>
              <li>Email: hola@cotypack.com</li>
              <li>Asunto: Consulta sobre Cookies</li>
            </ul>

            <div className={styles.ctaBox}>
              <p>¿Querés saber más sobre cómo protegemos tus datos?</p>
              <Link href="/privacidad" className="btn btn-primary">
                Ver Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
